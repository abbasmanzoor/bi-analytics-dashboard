// src/hooks/useTransactions.ts
import { useQuery } from '@tanstack/react-query';
import { getData } from '../services/localStorageService'; // ✅ Naya import
import type { Transaction } from '../store/transactionStore';
import { useTransactionStore } from '../store/transactionStore';
import { useEffect } from 'react';

// 🚀 Ab yeh localStorage se data laega
const fetchTransactions = async (): Promise<Transaction[]> => {
  // Wohi 'transactions' key jo humne localStorageService mein set ki thi
  const data = getData('transactions');
  return data; // Direct array return ho raha hai
};

export const useTransactions = () => {
  const setTransactions = useTransactionStore((state) => state.setTransactions);

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    placeholderData: (prev) => prev,
    retry: 1,
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setTransactions(data);
    }
  }, [data, setTransactions]);

  return {
    transactions: Array.isArray(data) ? data : [],
    isLoading,
    error,
    isError,
  };
};