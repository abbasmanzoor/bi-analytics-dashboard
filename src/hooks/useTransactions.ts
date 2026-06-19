import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import type { Transaction } from '../store/transactionStore';
import { useTransactionStore } from '../store/transactionStore';
import { useEffect } from 'react';

const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get('/transactions');
  return response.data;
};

export const useTransactions = () => {
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  useEffect(() => {
    if (data) {
      setTransactions(data);
    }
  }, [data, setTransactions]);

  return { transactions: data, isLoading, error, isError };
};