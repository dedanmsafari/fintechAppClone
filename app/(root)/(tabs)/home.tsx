import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';

import Dropdown from '@/components/Dropdown';
import RoundBtn from '@/components/RoundBtn';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useBalanceStore } from '@/store/balanceStore';

const Home = () => {
  const headerHeight = useHeaderHeight();

  const { balance, clearTransactions, runTransaction, transactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      id: Math.random().toString(),
      title: 'Added money',
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingBottom: 120, paddingTop: headerHeight }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
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
        <RoundBtn
          icon="refresh"
          text="Exchange"
          onPress={() => clearTransactions()}
        />
        <RoundBtn icon="list" text="Details" />
        <Dropdown />
      </View>

      <Text style={defaultStyles.sectionHeader}>Transactions</Text>

      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ color: Colors.gray, padding: 14 }}>
            No Transactions yet
          </Text>
        )}
        {transactions.reverse().map(transaction => (
          <View
            key={transaction.id}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              gap: 16,
            }}>
            <View style={styles.circle}>
              <Ionicons name={transaction.amount > 0 ? 'add' : 'remove'} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text>{transaction.amount}€</Text>
          </View>
        ))}
      </View>
      <Text style={defaultStyles.sectionHeader}>Widgets</Text>
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
  circle: {
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    width: 40,
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
  transactions: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    gap: 20,
    marginHorizontal: 20,
    padding: 14,
  },
});
