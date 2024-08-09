import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSession } from '@/context/authContext';

const Account = () => {
  const { signOut } = useSession();
  const { top } = useSafeAreaInsets();
  return (
    <View style={[defaultStyles.container, { marginTop: top }]}>
      <TouchableOpacity
        style={[
          defaultStyles.pillButton,
          { backgroundColor: Colors.lightGray, marginTop: 10 },
        ]}
        onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={defaultStyles.pillButton}
        onPress={() => router.back()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;
