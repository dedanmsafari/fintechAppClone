import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

import Colors from '@/constants/Colors';

export default function RootLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="signUp"
        options={{
          headerBackTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          title: '',
        }}
      />
    </Stack>
  );
}
