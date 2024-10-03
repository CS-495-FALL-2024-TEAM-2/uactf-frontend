"use client"
import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";
import ChallengesTable from "../../../components/ChallengesTable";
import { useGetChallenges } from "@/hooks/challenges.hooks";

export default function Page() {
  const curr_year = new Date().getFullYear();
  const {isPending, error, data} = useGetChallenges(curr_year);

  if (isPending) return <div className="flex justify-center items-center h-100 text-bold">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-100 text-bold">Error: {error.message}</div>;
  return (
    <NextUIProvider>
      <ChallengesTable challengesData={data.challenges} />
    </NextUIProvider>
  );
}
