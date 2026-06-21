// src/services/localStorageService.ts

// 📦 Yeh data db.json se copy kiya gaya hai
const INITIAL_DATA = {
  transactions: [
    { id: 1, customerName: "Ahmed Enterprises", revenue: 125000, orders: 12, status: "Paid", region: "Karachi" },
    { id: 2, customerName: "Fatima Traders", revenue: 85000, orders: 8, status: "Paid", region: "Lahore" },
    { id: 3, customerName: "Hassan & Sons", revenue: 340000, orders: 24, status: "Pending", region: "Islamabad" },
    { id: 4, customerName: "Zara Solutions", revenue: 210000, orders: 15, status: "Paid", region: "Rawalpindi" },
    { id: 5, customerName: "Usman Group", revenue: 540000, orders: 42, status: "Pending", region: "Faisalabad" },
    { id: 6, customerName: "Aisha Technologies", revenue: 96000, orders: 9, status: "Paid", region: "Peshawar" },
    { id: 7, customerName: "Khan & Co.", revenue: 280000, orders: 18, status: "Paid", region: "Quetta" },
    { id: 8, customerName: "Noor Enterprises", revenue: 73000, orders: 6, status: "Pending", region: "Multan" },
    { id: 9, customerName: "Bilal Traders", revenue: 450000, orders: 30, status: "Paid", region: "Sialkot" },
    { id: 10, customerName: "Hina Industries", revenue: 192000, orders: 14, status: "Paid", region: "Hyderabad" }
  ],
  revenue: [
    { month: "Jan", revenue: 32000 },
    { month: "Feb", revenue: 35000 },
    { month: "Mar", revenue: 38000 },
    { month: "Apr", revenue: 42000 },
    { month: "May", revenue: 48000 },
    { month: "Jun", revenue: 54239 }
  ],
  sales: [
    { category: "Electronics", sales: 18500 },
    { category: "Clothing", sales: 12500 },
    { category: "Home & Living", sales: 9800 },
    { category: "Books", sales: 4200 }
  ],
  category: [
    { name: "Solvency", value: 45 },
    { name: "Revenue", value: 30 },
    { name: "Handles", value: 15 },
    { name: "Other", value: 10 }
  ],
  growth: [
    { month: "Jan", customers: 1200 },
    { month: "Feb", customers: 1450 },
    { month: "Mar", customers: 1700 },
    { month: "Apr", customers: 2100 },
    { month: "May", customers: 2600 },
    { month: "Jun", customers: 3100 }
  ]
};

// 🚀 App start hotey hi localStorage mein data seed karne ke liye
export const initializeLocalStorage = () => {
  Object.keys(INITIAL_DATA).forEach((key) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(INITIAL_DATA[key as keyof typeof INITIAL_DATA]));
    }
  });
};

// 📥 Data get karna
export const getData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// ➕ Naya item add karna (ID khud generate hogi)
export const addItem = (key: string, newItem: any) => {
  const existing = getData(key);
  const maxId = existing.reduce((max: number, item: any) => Math.max(max, item.id || 0), 0);
  const updated = [...existing, { ...newItem, id: maxId + 1 }];
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

// ✏️ Item update karna
export const updateItem = (key: string, id: number, updatedData: any) => {
  const existing = getData(key);
  const updated = existing.map((item: any) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};

// ❌ Item delete karna
export const deleteItem = (key: string, id: number) => {
  const existing = getData(key);
  const updated = existing.filter((item: any) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(updated));
  return updated;
};