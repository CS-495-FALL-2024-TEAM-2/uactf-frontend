"use client"
import { usePathname } from "next/navigation";
import { useGetCurrentUser } from "@/contexts/current-user.context";

export function useProtectedRoute() {
    const currentUser = useGetCurrentUser();

    const pathname = usePathname();


    if (pathname.startsWith("/competitions")){
        if (currentUser?.userRole === "admin"){
            return true;
        }
    } else if (pathname.startsWith("/challenges")){
        if (currentUser?.userRole === "admin" || currentUser?.userRole === "uacd"){
            return true;
        } 
    } else if (pathname.startsWith("/teams")){
        if (currentUser?.userRole === "admin" || currentUser?.userRole === "teacher"){
            return true;
        }
    }

    return false;
}
