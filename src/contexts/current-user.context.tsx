import React, { createContext, useContext, useEffect } from 'react';


export type CurrentUserContextObjectType = {
    userRole: string,
    userId: string
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
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    
    
    useEffect(() => {
        if (currentUser == null){
    
          // this assumes we already have valid access and refresh tokens stored in cookies
          // if the api call fails, we would simply redirect to /login
          //simulate api call
          setTimeout(() => {
          }, 2000);
      
          const apiResponse = {
            userId: "1",
            userRole: "teacher"
          };
    
          console.log("hey");
    
          setCurrentUser(apiResponse);
        }    

        console.log("useGetCurrentUser")
    }, []);
    return currentUser
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