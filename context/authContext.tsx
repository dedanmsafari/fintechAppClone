import React, { Dispatch, PropsWithChildren, useState } from 'react';
import { Alert } from 'react-native';

import {
  isClerkAPIResponseError,
  useAuth,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo';
import { router } from 'expo-router';

import { createContext } from '@/utils/context';
import { useStorageState } from '@/utils/useStorageState';

type AuthProps = {
  signIn: () => Promise<void>;
  signOut: () => void;
  signUp: (code: string, phone: string) => Promise<void>;
  logIn: (code: string, phone: string) => Promise<void>;
  verify: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
  loading: boolean;
  code: string;
  setCode: Dispatch<React.SetStateAction<string>>;
};

const [useContext, Provider] = createContext<AuthProps>();

export const useSession = useContext;

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [loading, setloading] = useState(false);
  const [code, setCode] = useState('');

  const { signOut } = useAuth();

  const onSignUp = useSignUp();
  const onSignIn = useSignIn();

  const verify = async () => {
    try {
      await onSignUp.signUp!.attemptPhoneNumberVerification({
        code,
      });
      await onSignUp.setActive!({ session: onSignUp.signUp!.createdSessionId });
      setSession(onSignUp.signUp!.createdSessionId);
    } catch (err) {
      Alert.alert('Error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
    }
  };

  const signInFirstTimeVerificationOTP = async () => {
    try {
      await onSignIn.signIn!.attemptFirstFactor({
        code,
        strategy: 'phone_code',
      });
      await onSignUp.setActive!({ session: onSignIn.signIn!.createdSessionId });
      setSession(onSignUp.signUp!.createdSessionId);
    } catch (err) {
      Alert.alert('Error', JSON.stringify(err, null, 2));
      if (isClerkAPIResponseError(err)) {
        Alert.alert('Error', err.errors[0].message);
      }
    }
  };
  const signInSecondTimeVerificationOTP = async (
    code: string,
    phone: string
  ) => {
    const fullPhoneNumber = `${code}${phone}`;

    setloading(true);
    if (!onSignIn.isLoaded) {
      return;
    }

    try {
      const { supportedFirstFactors } = await onSignIn.signIn!.create({
        identifier: fullPhoneNumber,
      });

      const firstPhoneFactor: any = supportedFirstFactors.find(
        (factor: any) => {
          return factor.strategy === 'phone_code';
        }
      );

      const { phoneNumberId } = firstPhoneFactor;

      await onSignIn.signIn!.prepareFirstFactor({
        phoneNumberId,
        strategy: 'phone_code',
      });

      router.push(`/verify/${fullPhoneNumber}?signin=true`);
    } catch (err) {
      // Default error message in case something goes wrong
      let errorMessage = 'An unknown error occurred';

      // Type-check to ensure `err` is an object
      if (typeof err === 'object' && err !== null) {
        const errorObj = err as {
          status?: number;
          clerkError?: boolean;
          errors?: { longMessage: string }[];
        };

        // Check if `errors` exists and has at least one entry
        if (Array.isArray(errorObj.errors) && errorObj.errors.length > 0) {
          errorMessage = errorObj.errors[0].longMessage;
        }
      }

      // Display the longMessage in an alert
      Alert.alert('Error Signing In', errorMessage);
      setloading(false);
    }
  };

  const logOut = async () => {
    signOut();
    setSession(null);
  };

  const signUp = async (code: string, phone: string) => {
    const fullPhoneNumber = `${code}${phone}`;

    setloading(true);
    if (!onSignUp.isLoaded) {
      return;
    }

    try {
      await onSignUp.signUp!.create({
        phoneNumber: fullPhoneNumber,
      });

      onSignUp.signUp!.preparePhoneNumberVerification();
      router.push(`/verify/${fullPhoneNumber}`);

      setloading(false);
    } catch (err) {
      // Default error message in case something goes wrong
      let errorMessage = 'An unknown error occurred';

      // Type-check to ensure `err` is an object
      if (typeof err === 'object' && err !== null) {
        const errorObj = err as {
          status?: number;
          clerkError?: boolean;
          errors?: { longMessage: string }[];
        };

        // Check if `errors` exists and has at least one entry
        if (Array.isArray(errorObj.errors) && errorObj.errors.length > 0) {
          errorMessage = errorObj.errors[0].longMessage;
        }
      }

      // Display the longMessage in an alert
      Alert.alert('Error Signing In', errorMessage);
      setloading(false);
    }
  };

  const value = {
    code,
    isLoading,
    loading,
    logIn: signInSecondTimeVerificationOTP,
    session,
    setCode,
    signIn: signInFirstTimeVerificationOTP,
    signOut: logOut,
    signUp,
    verify,
  };
  return <Provider value={value}>{children}</Provider>;
};

export default SessionProvider;
