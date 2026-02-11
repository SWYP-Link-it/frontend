import { api } from '@/src/lib/api/api';

export const getCreditBalance = () => {
  return api.get('/credits/balance');
};
