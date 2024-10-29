"use client"
import { CurrentUserContext, useGetCurrentUser } from "@/contexts/current-user.context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const currentUser = useGetCurrentUser();

  const router = useRouter();

  useEffect(() => {
    if (currentUser !== null){
      // if we decide to not conditionally render pages in this component, we should probably move to logic to LoginForm as well and use it instead of redirecting to /
      if (currentUser?.userRole == "admin"){
        router.replace("/competitions");
      } else if (currentUser?.userRole == "crimson_defense") {
        router.replace("/challenges");
      } else if (currentUser?.userRole == "teacher"){
        router.replace("/teams");
      }
    }
    

  }, [currentUser]);

  // we could render homepage content here, but for demo purposes, i'll just redirect to "home" page
  return <></>;
}
