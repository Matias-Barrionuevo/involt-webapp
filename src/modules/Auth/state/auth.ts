import { decodedJWT } from '@/helper/decodedJwt';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  isLogin: () => boolean;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set, get) => ({
      token: '',
      setToken: (token) => set({ token }),
      isLogin: () => {
        const { token } = get();
        if (!token) {
          return false;
        }

        const { exp } = decodedJWT(token) as { exp: number };

        const tokenExpires = (exp ?? 0) * 1000;
        const currentTime = new Date().getTime();

        const isExpired = currentTime > tokenExpires;

        if (isExpired) {
          return false;
        }
        return true;
      },
    }),
    { name: 'authStore' }
  )
);
