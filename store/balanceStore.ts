import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from './mmkv-storage';

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  date: Date;
};

export type BalanceState = {
  transactions: Transaction[];
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
};

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      balance: () =>
        get().transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        ),
      clearTransactions: () => {
        set({ transactions: [] });
      },
      runTransaction: (transaction: Transaction) => {
        set(state => ({ transactions: [...state.transactions, transaction] }));
      },
      transactions: [],
    }),
    {
      name: 'balance',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
