'use client';

import { api } from '@/src/lib/api/api';
import { useIsLoggedIn } from '@/src/stores/selectors';

export default function Home() {
  const isLoggedIn = useIsLoggedIn();
  return (
    <div>
      {isLoggedIn ? 'Logged in' : 'Not logged in'}
      <button
        onClick={() => {
          api.get('/chat/rooms').then((response) => {
            console.log('성공:', response.data);
          });
        }}
      >
        테스트 요청
      </button>
    </div>
  );
}
