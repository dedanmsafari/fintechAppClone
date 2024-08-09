import React, { Dispatch, PropsWithChildren, useState } from 'react';
import { Alert } from 'react-native';

import {
  isClerkAPIResponseError,
  useAuth,
  useSignIn,
  useSignUp,
} from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

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

  const router = useRouter();

  const { signOut } = useAuth();

  const onSignUp = useSignUp();
  const onSignIn = useSignIn();

  //!!When a user is Signing Up first time VerifyCode ..ok
  const verify = async () => {
    setloading(true);
    try {
      await onSignUp.signUp!.attemptPhoneNumberVerification({
        code,
      });
      await onSignUp.setActive!({ session: onSignUp.signUp!.createdSessionId });
      setSession(onSignUp.signUp!.createdSessionId);
      setloading(false);
    } catch (err) {
      setloading(false);
      if (isClerkAPIResponseError(err)) {
        Alert.alert(
          'Error One',
          err.errors[0].longMessage || err.errors[0].message
        );
      }
    }
  };

  //!!When a user is logging in back VerifyCode..ok
  const logInVerifyCode = async () => {
    setloading(true);
    try {
      await onSignIn.signIn!.attemptFirstFactor({
        code,
        strategy: 'phone_code',
      });

      await onSignUp.setActive!({ session: onSignIn.signIn!.createdSessionId });

      setSession(onSignIn.signIn!.createdSessionId);
      setloading(false);
    } catch (err) {
      setloading(false);
      if (isClerkAPIResponseError(err)) {
        Alert.alert(
          'Error Two',
          err.errors[0].longMessage || err.errors[0].message
        );
      }
    }
  };

  //!!When a user is logging in back..ok
  const logIn = async (code: string, phone: string) => {
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
      setloading(false);
    } catch (err) {
      setloading(false);
      if (isClerkAPIResponseError(err)) {
        Alert.alert(
          'Error Three',
          err.errors[0].longMessage || err.errors[0].message
        );
      }
    }
  };
  const logOut = async () => {
    signOut();
    setSession(null);
  };

  //!!When a user is Signing Up first time ..ok
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
      setloading(false);
      if (isClerkAPIResponseError(err)) {
        Alert.alert(
          'Error Four',
          err.errors[0].longMessage || err.errors[0].message
        );
      }
    }
  };

  const value = {
    code,
    isLoading,
    loading,
    logIn,
    session,
    setCode,
    signIn: logInVerifyCode,
    signOut: logOut,
    signUp,
    verify,
  };
  return <Provider value={value}>{children}</Provider>;
};

export default SessionProvider;
