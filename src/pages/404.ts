import { HOME_PAGE_URL } from '@/core/constants';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push(HOME_PAGE_URL);
  }, [router]);

  return null;
}
