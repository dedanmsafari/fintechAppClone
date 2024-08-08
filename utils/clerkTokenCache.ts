import { Alert } from 'react-native';

import * as SecureStore from 'expo-secure-store';

const tokenCache = {
  async getToken(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      Alert.alert('Error getting token', err as string);
      return null;
    }
  },

  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      Alert.alert('Error saving token', err as string);
    }
  },
};

export default tokenCache;
