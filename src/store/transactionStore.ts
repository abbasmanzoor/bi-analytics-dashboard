import { create } from 'zustand';

export interface Transaction {
  id: number;
  customerName: string;
  revenue: number;
  orders: number;
  status: string;
  region: string;
}

interface TransactionStore {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
}));