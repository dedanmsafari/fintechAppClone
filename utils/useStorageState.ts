import * as React from 'react';
import { Alert, Platform } from 'react-native';

import * as SecureStore from 'expo-secure-store';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      if (value === null) {
        // eslint-disable-next-line no-undef
        localStorage.removeItem(key);
      } else {
        // eslint-disable-next-line no-undef
        localStorage.setItem(key, value);
      }
    } catch (error) {
      Alert.alert('Local storage is unavailable', error as string);
    }
  } else {
    if (value === null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          // eslint-disable-next-line no-undef
          setState(localStorage.getItem(key));
        }
      } catch (error) {
        Alert.alert('Local storage is unavailable', error as string);
      }
    } else {
      SecureStore.getItemAsync(key)
        .then(value => setState(value))
        .catch(() => Alert.alert('Failed to get user session'));
    }
  }, [key, setState]);

  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key, setState]
  );

  return [state, setValue];
}
