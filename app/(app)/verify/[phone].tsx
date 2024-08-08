import React, { Fragment, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Link, useLocalSearchParams } from 'expo-router';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useSession } from '@/context/authContext';

const CELL_COUNT = 6;

const Phone = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const { code, setCode, signIn, verify } = useSession();
  const ref = useBlurOnFulfill({ cellCount: CELL_COUNT, value: code });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    setValue: setCode,
    value: code,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === 'true') {
        verify();
      }
    } else {
      signIn();
    }
  }, [code, signIn, signin, verify]);

  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.header}>6-digit code</Text>
      <Text style={defaultStyles.descriptionText}>
        Code sent to {phone} unless you already have an account
      </Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={code}
        onChangeText={setCode}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        testID="my-code-input"
        renderCell={({ index, isFocused, symbol }) => (
          <Fragment key={index}>
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cellRoot, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
            {index === 2 ? (
              <View key={`separator-${index}`} style={styles.separator} />
            ) : null}
          </Fragment>
        )}
      />

      <Link href="/login" replace asChild>
        <TouchableOpacity>
          <Text style={defaultStyles.textLink}>
            Already have an account? Log in
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Phone;

const styles = StyleSheet.create({
  cellRoot: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    width: 45,
  },
  cellText: {
    color: Colors.dark,
    fontSize: 36,
    textAlign: 'center',
  },
  codeFieldRoot: {
    gap: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
  },
  focusCell: {
    paddingBottom: 8,
  },

  separator: {
    alignSelf: 'center',
    backgroundColor: Colors.gray,
    height: 2,
    width: 10,
  },
});
