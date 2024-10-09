"use client"
import { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CurrentUserContext } from "@/contexts/current-user.context";
import { useGetCurrentUser } from "./current-user.hooks";

export function useProtectedRoute() {
  const currentUser = useGetCurrentUser();

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
      if (checkRoute()){
          setIsValidRoute(true);
      } else {
          router.replace("/");
      }
      
  }, []);

  return isValidRoute;
}
