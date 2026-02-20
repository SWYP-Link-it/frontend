import { api } from '@/src/lib/api/api';

export const completeRegistration = (nickname: string) => {
  return api.post('/auth/complete-registration', {
    nickname,
  });
};
