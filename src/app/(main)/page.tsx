'use client';

import { api } from '@/src/lib/api/api';
import { useIsLoggedIn } from '@/src/stores/selectors';
import { toast } from 'sonner';

export default function Home() {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div>
      {isLoggedIn ? 'Logged in' : 'Not logged in'}
      <button
        onClick={() => {
          toast.error(
            '테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트테스트',
          );
        }}
      >
        테스트 버튼
      </button>
    </div>
  );
}
