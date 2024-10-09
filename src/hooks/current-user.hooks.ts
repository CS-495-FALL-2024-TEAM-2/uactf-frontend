import { CurrentUserContext } from "@/contexts/current-user.context";
import { useContext, useEffect } from "react";

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