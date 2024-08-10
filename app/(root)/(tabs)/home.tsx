import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useHeaderHeight } from '@react-navigation/elements';

import Dropdown from '@/components/Dropdown';
import RoundBtn from '@/components/RoundBtn';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const Home = () => {
  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {};
  const clearTransactions = () => {};
  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>1450</Text>
          <Text style={styles.currency}>€</Text>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.lightGray, marginVertical: 20 },
          ]}>
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>
            Accounts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionRow}>
        <RoundBtn icon="add" text="Add money" onPress={onAddMoney} />
        <RoundBtn icon="refresh" text="Exchange" onPress={clearTransactions} />
        <RoundBtn icon="list" text="Details" />
        <Dropdown />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  account: { alignItems: 'center', margin: 80 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
  },
  row: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
});
