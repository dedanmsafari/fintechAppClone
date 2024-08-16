import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Redirect, router, Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import { useSession } from '@/context/authContext';

const AppLayout = () => {
  const { session } = useSession();
  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/account"
        options={{
          headerLeft: () => <></>,
          headerShown: true,
          headerTitle: '',
          headerTransparent: true,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="(modal)/lock"
        options={{
          animation: 'none',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="crypto/[id]"
        options={{
          headerLargeTitle: true,
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Ionicons
                  name="notifications-outline"
                  color={Colors.dark}
                  size={30}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerTransparent: true,
          title: '',
        }}
      />
    </Stack>
  );
};

export default AppLayout;
