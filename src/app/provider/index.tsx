'use client';

import { ChakraProvider } from '@chakra-ui/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import theme from '../../utils/theme/theme';
import { CurrentUserContext, CurrentUserContextObjectType } from '@/contexts/current-user.context';
import React, { useEffect } from 'react';

export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

   // put in context provider location
  const [currentUser, setCurrentUser] = React.useState<CurrentUserContextObjectType | null>(null);


  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
          {children}
        </CurrentUserContext.Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
