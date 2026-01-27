'use client';

import { api } from '@/src/lib/api/api';
import { useEffect } from 'react';

export default function Profile() {
  useEffect(() => {
    api.get('/me').then((response) => {
      console.log('성공:', response.data);
    });
  }, []);

  return <div>Profile page</div>;
}
