import React from 'react';

import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SessionProvider from '@/context/authContext';
import tokenCache from '@/utils/clerkTokenCache';

const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SessionProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Slot />
        </GestureHandlerRootView>
      </SessionProvider>
    </ClerkProvider>
  );
}
