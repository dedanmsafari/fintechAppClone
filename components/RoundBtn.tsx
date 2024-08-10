import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';

type RoundBtnProps = {
  icon: typeof Ionicons.defaultProps;
  text: string;
  onPress?: () => void;
};

const RoundBtn = ({ icon, onPress, text }: RoundBtnProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.circle}>
        <Ionicons name={icon} size={30} color={Colors.dark} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RoundBtn;

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    height: 60,
    justifyContent: 'center',
    width: 60,
  },
  container: {
    alignItems: 'center',
    gap: 10,
  },
  label: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: '500',
  },
});
