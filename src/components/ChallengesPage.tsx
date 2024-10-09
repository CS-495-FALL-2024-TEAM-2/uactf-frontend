"use client"

import { useGetChallenges } from "@/hooks/challenges.hooks";
import { NextUIProvider } from "@nextui-org/system";
import ChallengesTable from "./ChallengesTable";

export default function ChallengesPage(){
    const {isPending, error, data} = useGetChallenges();

    if (isPending) return <div className="flex justify-center items-center h-100 text-bold">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-100 text-bold">Error: {error.message}</div>;

    return (
        <NextUIProvider>
        <ChallengesTable challengesData={data.challenges} />
        </NextUIProvider>
    );
}