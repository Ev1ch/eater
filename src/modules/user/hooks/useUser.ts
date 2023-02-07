import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSelector } from '@/store/hooks';
import { selectIsAuthPending, selectUser } from '../slice/selectors';

const useUser = ({
  redirectTo,
  redirectIfFound,
}: {
  redirectTo?: string;
  redirectIfFound?: string;
} = {}) => {
  const router = useRouter();
  const isAuthPending = useSelector(selectIsAuthPending);
  const currentUser = useSelector(selectUser);

  useEffect(() => {
    if (isAuthPending) {
      return;
    }

    if (!currentUser) {
      if (redirectTo) {
        router.push(redirectTo);
      }

      return;
    }

    if (redirectIfFound) {
      router.push(redirectIfFound);
    }
  }, [isAuthPending, currentUser, redirectIfFound, redirectTo, router]);

  return { user: currentUser, isAuthPending };
};

export default useUser;
