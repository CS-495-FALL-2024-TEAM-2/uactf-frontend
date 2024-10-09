"use client"
import { CurrentUserContext } from "@/contexts/current-user.context";
import { useGetCurrentUser } from "@/hooks/current-user.hooks";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const currentUser = useGetCurrentUser();

  const router = useRouter();

  useEffect(() => {
    // if we decide to not conditionally render pages in this component, we should probably move to logic to LoginForm as well and use it instead of redirecting to /
    if (currentUser?.userRole == "admin"){
      router.replace("/competitions");
    } else if (currentUser?.userRole == "uacd") {
      router.replace("/challenges");
    } else if (currentUser?.userRole == "teacher"){
      router.replace("/teams");
    }

  }, []);

  // we could render homepage content here, but for demo purposes, i'll just redirect to "home" page
  return <></>;
}
