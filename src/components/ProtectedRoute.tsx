"use client"


import { useGetCurrentUser } from "@/contexts/current-user.context";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function ProtectedRoute({ children }: {
    children: React.ReactNode;
  }) {
  const router = useRouter();

  const [isValidRoute, setIsValidRoute] = useState(false);

  const currentUser = useGetCurrentUser();


  const pathname = usePathname();


  useEffect(() => {
    let result = false;
    if (currentUser !== null){
        if (pathname.startsWith("/competitions")){
            if (currentUser?.userRole === "admin"){
                result = true;
            }
        } else if (pathname.startsWith("/challenges")){
            if (currentUser?.userRole === "admin" || currentUser?.userRole === "crimson_defense"){
                result = true;
            }
        } else if (pathname.startsWith("/teachers")){
            if (currentUser?.userRole === "admin"){
                result = true;
            }
        } else if (pathname.startsWith("/teams")){
            if (currentUser?.userRole === "teacher"){
                result = true;
            }
        }

        if (result === false){
          router.replace("/");
        } else {
          setIsValidRoute(true);
        }
    }

  }, [currentUser]);



  if (isValidRoute){
    return (
      <>{children}</>
    );
  }

  return <div>Loading...</div>;


}
