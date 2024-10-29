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
    
    useEffect(() => {
        if (currentUser == null){
          // this assumes we already have valid access and refresh tokens stored in cookies
          // if the api call fails, we would simply redirect to /login
          //simulate api call
          setTimeout(() => {
          }, 2000);
      
          const apiResponse = {
            userRole: "admin"
          };
        
          setCurrentUser(apiResponse);
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