"use client"

import { CurrentUserContext } from "@/contexts/current-user.context";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";



export default function ProtectedRoute({children}: {
    children: React.ReactNode;
  }) {

    // could probably just take this as props as well
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

    const router = useRouter();

    const pathname = usePathname();

    const [isValidRoute, setIsValidRoute] = useState<boolean>(false);


    const checkRoute = () => {
        if (pathname.startsWith("/competitions")){
            if (currentUser?.userRole !== "admin"){
                return false;
            }
        } else if (pathname.startsWith("/challenges")){
            if (currentUser?.userRole !== "admin" && currentUser?.userRole !== "uacd"){
                return false;
            } 
        } else if (pathname.startsWith("/teams")){
            if (currentUser?.userRole !== "admin" && currentUser?.userRole !== "teacher"){
                return false;
            }
        }

        return true;
    }

    
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
    
        // currentUser =
    
        
      }, []);



    useEffect(() => {
        if (checkRoute()){
            setIsValidRoute(true);
        } else {
            router.replace("/");
        }
        
    }, [currentUser]);

   
    return (
    <>{isValidRoute && children}</>
    );
}
