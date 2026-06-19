/// <reference types="vite/client" />

// ✅ Add this for JSON imports
declare module '*.json' {
  const value: any;
  export default value;
}