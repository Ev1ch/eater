/* eslint-disable jsx-a11y/anchor-is-valid */
import type { ReactNode } from 'react';

import { AppBar, Box, Container, Toolbar, Link, Typography, Divider } from '@/components/common';
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
    <Link href="" onClick={handleSignOut}>
      Sign out
    </Link>
  ) : (
    <Link href="" onClick={handleSignIn}>
      Sign in
    </Link>
  );

  const profile = user ? (
    <>
      <Box sx={{ ml: 'auto' }}>
        <Typography>{user.fullName}</Typography>
      </Box>
      <Divider sx={{ mx: 2 }} orientation="vertical" flexItem />
    </>
  ) : (
    <Box />
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar sx={{ position: 'static' }}>
        <Toolbar>
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link href="/">Home</Link>
            {profile}
            <Box>{link}</Box>
          </Container>
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
