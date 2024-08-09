import { ActivityIndicator, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Link, Redirect, Stack, useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSession } from '@/context/authContext';

export default function RootLayout() {
  const { isLoading, session } = useSession();
  const router = useRouter();

  if (session) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  if (isLoading) {
    return (
      <View style={defaultStyles.loadingOverlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

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
      <Stack.Screen
        name="login"
        options={{
          headerBackTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Link href="/help" asChild>
              <TouchableOpacity>
                <Ionicons
                  name="help-circle-outline"
                  size={34}
                  color={Colors.dark}
                />
              </TouchableOpacity>
            </Link>
          ),
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          title: '',
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background },
          headerTitle: 'Help',
          headerTitleAlign: 'center',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          headerBackTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
          headerTitle: 'Verify',
          headerTitleAlign: 'center',
          headerTransparent: true,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
