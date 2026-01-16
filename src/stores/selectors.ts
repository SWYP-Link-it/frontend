import { useAuthStore } from './authStore';

export const useIsLoggedIn = () =>
  useAuthStore((state) => state.accessToken !== null);
