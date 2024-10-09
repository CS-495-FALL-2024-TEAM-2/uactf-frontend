import { CurrentUserContext, CurrentUserContextObjectType } from '@/contexts/current-user.context';
import React, { useEffect } from 'react';


export default function CurrentUserProvider({
    children
  }: {
    children: React.ReactNode;
  }){

    const [currentUser, setCurrentUser] = React.useState<CurrentUserContextObjectType | null>(null);

    useEffect(() => {
        if (currentUser == null){
    
          // this assumes we already have valid access and refresh tokens stored in cookies
          // if the api calls, we would simply redirect to /login
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
        
      }, []);

    return 
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUserContext.Provider>
}