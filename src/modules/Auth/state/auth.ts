import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string;
  setToken: (token: string) => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: '',
      setToken: (token) => set({ token }),
    }),
    { name: 'authStore' }
  )
);
