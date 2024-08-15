/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { Circle, useFont } from '@shopify/react-native-skia';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { CartesianChart, Line, useChartPressState } from 'victory-native';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

const categories = ['Overview', 'News', 'Orders', 'Transactions'];

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const headerHeight = useHeaderHeight();
  const [activeIndex, setActiveIndex] = useState(0);
  const font = useFont(require('@/assets/fonts/RobotoMono-Regular.ttf'), 12);

  const { isActive, state } = useChartPressState({ x: 0, y: { price: 0 } });

  useEffect(() => {
    // console.log(isActive);
    if (isActive) Haptics.selectionAsync();
  }, [isActive]);

  const { data } = useQuery({
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then(res => res.json());
      return info[+id];
    },
    queryKey: ['info', id],
  });

  const { data: tickers } = useQuery({
    queryFn: async (): Promise<any[]> =>
      fetch(`/api/tickers`).then(res => res.json()),
    queryKey: ['tickers'],
  });

  const animatedText = useAnimatedProps(() => {
    return {
      defaultValue: '',
      text: `${state.y.price.value.value.toFixed(2)} €`,
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);

    return {
      defaultValue: '',
      text: `${date.toLocaleDateString()}`,
    };
  });

  return (
    <>
      <Stack.Screen
        options={{ headerTitleAlign: 'center', title: data?.name }}
      />
      <SectionList
        stickySectionHeadersEnabled
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        keyExtractor={i => i.title}
        sections={[{ data: [{ title: 'Chart' }] }]}
        renderSectionHeader={() => (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth,
              justifyContent: 'space-between',
              padding: 8,
              paddingHorizontal: 16,
              width: '100%',
            }}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveIndex(index)}
                style={
                  activeIndex === index
                    ? styles.categoriesBtnActive
                    : styles.categoriesBtn
                }>
                <Text
                  style={
                    activeIndex === index
                      ? styles.categoryTextActive
                      : styles.categoryText
                  }>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 16,
              }}>
              <Text style={styles.subtitle}>{data?.symbol}</Text>
              <Image
                source={{ uri: data?.logo }}
                style={{ height: 60, width: 60 }}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primary,
                    flexDirection: 'row',
                    gap: 16,
                  },
                ]}>
                <Ionicons name="add" size={24} color={Colors.white} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.white }]}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  {
                    backgroundColor: Colors.primaryMuted,
                    flexDirection: 'row',
                    gap: 16,
                  },
                ]}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text
                  style={[defaultStyles.buttonText, { color: Colors.primary }]}>
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View style={[defaultStyles.block, { height: 500 }]}>
              {tickers && (
                <>
                  {!isActive && (
                    <View>
                      <Text
                        style={{
                          color: Colors.dark,
                          fontSize: 30,
                          fontWeight: 'bold',
                        }}>
                        {tickers[tickers.length - 1].price.toFixed(2)} €
                      </Text>
                      <Text style={{ color: Colors.gray, fontSize: 18 }}>
                        Today
                      </Text>
                    </View>
                  )}
                  {isActive && (
                    <View>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          color: Colors.dark,
                          fontSize: 30,
                          fontWeight: 'bold',
                        }}
                        animatedProps={animatedText}></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={'transparent'}
                        style={{
                          color: Colors.gray,
                          fontSize: 18,
                        }}
                        animatedProps={animatedDateText}></AnimatedTextInput>
                    </View>
                  )}
                  <CartesianChart
                    data={tickers!}
                    xKey="timestamp"
                    yKeys={['price']}
                    chartPressState={state}
                    axisOptions={{
                      font,
                      formatXLabel: ms => format(new Date(ms), 'MM/yy'),
                      formatYLabel: v => `${v} €`,
                      labelColor: Colors.gray,
                      labelOffset: { x: -2, y: 0 },
                      tickCount: 5,
                    }}>
                    {({ points }) => (
                      <>
                        {isActive && (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        )}
                        <Line
                          points={points.price}
                          color={Colors.primary}
                          strokeWidth={3}
                        />
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
            <View style={[defaultStyles.block, { margin: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}></SectionList>
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  categoriesBtn: {
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 14,
  },
  categoriesBtnActive: {
    alignItems: 'center',
    backgroundColor: Colors.white,

    borderRadius: 20,
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 14,
  },
  categoryText: {
    color: Colors.dark,
    fontSize: 14,
  },
  categoryTextActive: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.gray,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
