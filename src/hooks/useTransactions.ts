import { useState, useEffect } from 'react';
import { type Transaction } from '../store/transactionStore';

// ✅ Static transactions – no API call
const STATIC_TRANSACTIONS: Transaction[] = [
  { id: 1, customerName: 'Ahmed Enterprises', revenue: 125000, orders: 12, status: 'Paid', region: 'Karachi' },
  { id: 2, customerName: 'Fatima Traders', revenue: 85000, orders: 8, status: 'Paid', region: 'Lahore' },
  { id: 3, customerName: 'Hassan & Sons', revenue: 340000, orders: 24, status: 'Pending', region: 'Islamabad' },
  { id: 4, customerName: 'Zara Solutions', revenue: 210000, orders: 15, status: 'Paid', region: 'Rawalpindi' },
  { id: 5, customerName: 'Usman Group', revenue: 540000, orders: 42, status: 'Pending', region: 'Faisalabad' },
  { id: 6, customerName: 'Aisha Technologies', revenue: 96000, orders: 9, status: 'Paid', region: 'Peshawar' },
  { id: 7, customerName: 'Khan & Co.', revenue: 280000, orders: 18, status: 'Paid', region: 'Quetta' },
  { id: 8, customerName: 'Noor Enterprises', revenue: 73000, orders: 6, status: 'Pending', region: 'Multan' },
  { id: 9, customerName: 'Bilal Traders', revenue: 450000, orders: 30, status: 'Paid', region: 'Sialkot' },
  { id: 10, customerName: 'Hina Industries', revenue: 192000, orders: 14, status: 'Paid', region: 'Hyderabad' },
];

export const useTransactions = () => {
  const [data] = useState(STATIC_TRANSACTIONS);
  const [isLoading] = useState(false);
  const [error] = useState(null);
  const [isError] = useState(false);

  return { transactions: data, isLoading, error, isError };
};