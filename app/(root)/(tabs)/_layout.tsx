import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomHeader from '@/components/CustomHeader';
import Colors from '@/constants/Colors';

const _layout = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarBackground: () => (
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            intensity={50}
            tint={'light'}
            style={{
              backgroundColor: Colors.tint,
              flex: 1,
            }}
          />
        ),

        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          bottom: 0,
          elevation: 0,
          left: 0,
          minHeight: 70,
          paddingBottom: bottom + 10,
          paddingTop: 10,
          position: 'absolute',
          right: 0,
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          header: () => <CustomHeader />,
          headerTransparent: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="line-chart" size={size} color={color} />
          ),
          title: 'Invest',
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
          title: 'Transfers',
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          header: () => <CustomHeader />,
          headerTransparent: true,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
          title: 'Crypto',
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
          title: 'Lifestyle',
        }}
      />
    </Tabs>
  );
};

export default _layout;
