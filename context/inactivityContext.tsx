/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { useRouter } from 'expo-router';
import { MMKV } from 'react-native-mmkv';

import { useSession } from './authContext';

const storage = new MMKV({
  id: 'inactivity-storage',
});

const InactivityProvider = ({ children }: PropsWithChildren) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  const { session } = useSession();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, [session]);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background') {
      recordStartTime();
    } else if (
      nextAppState === 'active' &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber('startTime') || 0);

      if (elapsed > 3000 && session) {
        router.replace('/(root)/(modal)/lock');
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set('startTime', Date.now());
  };

  return children;
};

export default InactivityProvider;
