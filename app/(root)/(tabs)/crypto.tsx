import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Currency } from '@/interfaces/crypto';

const Crypto = () => {
  const headerHeight = useHeaderHeight();

  const currencies = useQuery({
    queryFn: () => fetch('/api/listings').then(res => res.json()),
    queryKey: ['listings'],
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(',');

  const { data } = useQuery({
    enabled: !!ids,
    queryFn: () => fetch(`/api/info?ids=${ids}`).then(res => res.json()),
    queryKey: ['info', ids],
  });

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}>
      <Text style={defaultStyles.sectionHeader}>Latest Crypto</Text>
      <View style={defaultStyles.block}>
        {currencies.data?.map((currency: Currency) => (
          <Link href={`/crypto/${currency.id}`} asChild key={currency.id}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                gap: 14,
              }}>
              {data?.[currency.id].logo && (
                <Image
                  source={{ uri: data?.[currency.id].logo }}
                  style={{ height: 40, width: 40 }}
                />
              )}
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={{ color: Colors.dark, fontWeight: '600' }}>
                  {currency.name}
                </Text>
                <Text style={{ color: Colors.gray }}>{currency.symbol}</Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',

                  gap: 6,
                }}>
                <Text>{currency.quote.EUR.price.toFixed(2)} €</Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    gap: 4,
                  }}>
                  <Ionicons
                    name={
                      currency.quote.EUR.percent_change_1h > 0
                        ? 'caret-up'
                        : 'caret-down'
                    }
                    size={16}
                    color={
                      currency.quote.EUR.percent_change_1h > 0 ? 'green' : 'red'
                    }
                  />
                  <Text
                    // eslint-disable-next-line react-native/no-color-literals
                    style={{
                      color:
                        currency.quote.EUR.percent_change_1h > 0
                          ? 'green'
                          : 'red',
                    }}>
                    {currency.quote.EUR.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
};

export default Crypto;
