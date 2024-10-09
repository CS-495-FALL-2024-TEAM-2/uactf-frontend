"use client"
import { CurrentUserContext } from "@/contexts/current-user.context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Page() {
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext); 

  const router = useRouter();

  
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
    console.log("current user: ",currentUser);

    // if we decide to not conditionally render pages in this component, we should probably move to logic to LoginForm as well and use it instead of redirecting to /
    if (currentUser?.userRole == "admin"){
      router.replace("/competitions");
    } else if (currentUser?.userRole == "uacd") {
      router.replace("/challenges");
    } else if (currentUser?.userRole == "teacher"){
      router.replace("/teams");
    }

  }, [currentUser]);

  // we could render homepage content here, but for demo purposes, i'll just redirect to "home" page
  return <></>;
}
