import React from 'react';

import { Redirect, Stack } from 'expo-router';

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
    </Stack>
  );
};

export default AppLayout;
