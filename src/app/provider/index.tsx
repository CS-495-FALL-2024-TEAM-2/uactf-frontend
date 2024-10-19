'use client';

import { ChakraProvider } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import theme from '../../utils/theme/theme';
import React from 'react';
import { CurrentUserProvider } from '@/contexts/current-user.context';

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CurrentUserProvider>
          {children}
        </CurrentUserProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
