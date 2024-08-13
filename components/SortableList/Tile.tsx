import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useBalanceStore } from '@/store/balanceStore';

import { SIZE } from './Config';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 5,
    height: 150,
    padding: 14,
    shadowColor: Colors.dark,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    width: SIZE - 20,
  },
});
interface TileProps {
  id: string;
  onLongPress: () => void;
}

const Tile = ({ id }: TileProps) => {
  const { transactions } = useBalanceStore();

  if (id === 'spent') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: '500' }}>
          Spent this month
        </Text>
        <Text
          style={{
            color: Colors.dark,
            fontSize: 26,
            fontWeight: 'bold',
            paddingTop: 10,
          }}>
          1024€
        </Text>
      </View>
    );
  }

  if (id === 'cashback') {
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
        pointerEvents="none">
        <View
          style={{ alignItems: 'center', gap: 10, justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: Colors.primary,
              borderRadius: 30,
              height: 60,
              justifyContent: 'center',
              width: 60,
            }}>
            <Text
              style={{ color: Colors.white, fontSize: 18, fontWeight: 'bold' }}>
              5%
            </Text>
          </View>
          <Text
            style={{ color: Colors.gray, fontSize: 18, fontWeight: 'bold' }}>
            Cashback
          </Text>
        </View>
      </View>
    );
  }

  if (id === 'recent') {
    return (
      <View style={styles.container} pointerEvents="none">
        <View>
          <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: '500' }}>
            Recent transaction
          </Text>

          {transactions.length === 0 && (
            <Text
              style={{
                color: Colors.gray,
                fontSize: 18,
                fontWeight: 'bold',
                paddingTop: 10,
              }}>
              No transactions
            </Text>
          )}

          {transactions.length > 0 && (
            <>
              <Text
                style={{
                  color: Colors.dark,
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingVertical: 10,
                }}>
                {transactions[transactions.length - 1].amount}€
              </Text>
              <Text
                style={{
                  color: Colors.gray,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {transactions[transactions.length - 1].title}
              </Text>
            </>
          )}
        </View>
      </View>
    );
  }

  if (id === 'cards') {
    return (
      <View style={styles.container} pointerEvents="none">
        <Text style={{ color: Colors.gray, fontSize: 16, fontWeight: '500' }}>
          Cards
        </Text>
        <Ionicons
          name="card"
          size={50}
          color={Colors.primaryMuted}
          style={{ alignSelf: 'center', marginTop: 20 }}
        />
      </View>
    );
  }
};

export default Tile;
