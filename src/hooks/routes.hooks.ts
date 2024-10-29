"use client"
import { usePathname } from "next/navigation";
import { useGetCurrentUser } from "@/contexts/current-user.context";
import { useEffect, useState } from "react";

export function useProtectedRoute() {
    const currentUser = useGetCurrentUser();
    const pathname = usePathname();

    let result = false;


    useEffect(() => {
        if (currentUser !== null){
            if (pathname.startsWith("/competitions")){
                if (currentUser?.userRole === "admin"){
                    result = true;
                }
            } else if (pathname.startsWith("/challenges")){
                if (currentUser?.userRole === "admin" || currentUser?.userRole === "crimson_defense"){
                    result = true;
                } 
            } else if (pathname.startsWith("/teams")){
                if (currentUser?.userRole === "admin" || currentUser?.userRole === "teacher"){
                    result = true;
                }
            }
        }
    }, []);



    return result;
}
