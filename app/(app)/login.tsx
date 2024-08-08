/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TextInput } from 'react-native-gesture-handler';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSession } from '@/context/authContext';

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const countryCode = '+1';
  const { logIn } = useSession();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0;

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      logIn(countryCode, phoneNumber);
    } else {
      router.replace('/(root)/(tabs)/home');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number associated with your account
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value="+254"
            editable={false}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          disabled={!phoneNumber}
          style={[
            defaultStyles.pillButton,
            phoneNumber !== '' ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={() => onSignIn(SignInType.Phone)}>
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', flexDirection: 'row', gap: 16 }}>
          <View
            style={{
              backgroundColor: Colors.gray,
              flex: 1,
              height: StyleSheet.hairlineWidth,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              backgroundColor: Colors.gray,
              flex: 1,
              height: StyleSheet.hairlineWidth,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: Colors.white,
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
            },
          ]}>
          <Ionicons name="mail" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: Colors.white,
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
            },
          ]}>
          <Ionicons name="logo-google" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>
            Continue with google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              backgroundColor: Colors.white,
              flexDirection: 'row',
              gap: 16,
              marginTop: 20,
            },
          ]}>
          <Ionicons name="logo-apple" size={24} color={Colors.dark} />
          <Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>
            Continue with apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Page;

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 40,
  },
});
