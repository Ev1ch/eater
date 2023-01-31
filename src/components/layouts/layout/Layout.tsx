import type { ReactNode } from 'react';

import { Container } from '@/components/common';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <Container>{children}</Container>;
}
