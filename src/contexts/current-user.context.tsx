import { useGetUserRole } from '@/hooks/accounts.hooks';
import { BASE_API_URI } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';


export type CurrentUserContextObjectType = {
  userRole: string,
};

export type CurrentUserContextType = {
    currentUser: CurrentUserContextObjectType | null,
    setCurrentUser: (currentUser: CurrentUserContextObjectType | null) => void
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: null,
    setCurrentUser: () => {}
});

export function useGetCurrentUser(){
    let {currentUser, setCurrentUser} = useContext(CurrentUserContext);  
    const router = useRouter();  
    
    useEffect(() => {

      const getUserRoles = async () => {
        const response = await fetch(`${BASE_API_URI}/auth/role`, {credentials: 'include'});
        if (!response.ok) {
          router.replace("/login");
        } else {
          const data = await response.json();
          setCurrentUser({
            userRole: data.role
          });
        }
      }

      if (currentUser == null){
        getUserRoles();
      }    

    }, [currentUser]);

    return useContext(CurrentUserContext).currentUser;
    // return currentUser
}


export function CurrentUserProvider({
    children
  }: {
    children: React.ReactNode;
  }){

    const [currentUser, setCurrentUser] = React.useState<CurrentUserContextObjectType | null>(null);

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUserContext.Provider>
    );
}