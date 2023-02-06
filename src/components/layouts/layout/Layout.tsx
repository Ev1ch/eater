/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ReactNode } from 'react';

import { AppBar, Box, Container, Toolbar, Link, Typography } from '@/components/common';
import { useDispatch, useSelector } from '@/store/hooks';
import { selectUser, signInWithPopup, signOut } from '@/modules/user/slice';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSignIn = async () => {
    await dispatch(signInWithPopup()).unwrap();
  };

  const handleSignOut = async () => {
    await dispatch(signOut()).unwrap();
  };

  const link = user ? (
    <Link sx={{ color: 'primary.contrastText' }} href="" onClick={handleSignOut}>
      Sign out
    </Link>
  ) : (
    <Link sx={{ color: 'primary.contrastText' }} href="" onClick={handleSignIn}>
      Sign in
    </Link>
  );

  const profile = user ? (
    <Box>
      <Typography>{user.fullName}</Typography>
    </Box>
  ) : (
    <Box />
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar sx={{ position: 'static' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {profile}
          <Box>{link}</Box>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
