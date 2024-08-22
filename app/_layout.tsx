/* eslint-disable no-console */
import React from 'react';

import { ClerkProvider } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SessionProvider from '@/context/authContext';
import InactivityProvider from '@/context/inactivityContext';
import tokenCache from '@/utils/clerkTokenCache';

const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey;

console.log('Publishable Key in React Native Component:', publishableKey);

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <InactivityProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Slot />
            </GestureHandlerRootView>
          </InactivityProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
