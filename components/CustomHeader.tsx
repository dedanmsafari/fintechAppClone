import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';

const CustomHeader = () => {
  const { top } = useSafeAreaInsets();
  return (
    <BlurView intensity={80} tint={'extraLight'} style={{ paddingTop: top }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: Colors.transparent,
            gap: 10,
            height: 60,
            paddingHorizontal: 20,
          },
        ]}>
        <Link href={'/(root)/(modal)/account'} asChild>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: Colors.gray,
              borderRadius: 20,
              height: 40,
              justifyContent: 'center',
              width: 40,
            }}>
            <Text
              style={{ color: Colors.white, fontSize: 16, fontWeight: '500' }}>
              SG
            </Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.searchSection}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={20}
            color={Colors.dark}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={styles.circle}>
          <Ionicons name={'stats-chart'} size={20} color={Colors.dark} />
        </View>
        <View style={styles.circle}>
          <Ionicons name={'card'} size={20} color={Colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    color: Colors.dark,
    flex: 1,
    paddingBottom: 10,
    paddingLeft: 0,
    paddingRight: 10,
    paddingTop: 10,
  },
  searchIcon: {
    padding: 10,
  },
  searchSection: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
