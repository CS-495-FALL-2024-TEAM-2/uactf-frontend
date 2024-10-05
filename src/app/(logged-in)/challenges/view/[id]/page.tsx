"use client"
import NextLineInfoDisplay from "@/components/NextLineInfoDisplay";
import SameLineInfoDisplay from "@/components/SameLineInfoDisplay";
import TableInfoDisplay from "@/components/TableInfoDisplay";
import { useGetChallengeDetails } from "@/hooks/challenges.hooks";
import { Hint } from "@/types/challenges.types";
import { Heading, Stack } from "@chakra-ui/react";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
    const {isPending, error, data} = useGetChallengeDetails(params.id);

    if (isPending) return <div className="flex justify-center items-center h-100 text-bold">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-100 text-bold">Error: {error.message}</div>;
    if (data) return <>
        <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            {data.challenge.challenge_name.toUpperCase()}
        </Heading>
        <div className="w-full max-w-96">
            <NextLineInfoDisplay heading="Description" data={data.challenge.challenge_description}/>
            <SameLineInfoDisplay heading="Category" data={data.challenge.category} />
            <SameLineInfoDisplay heading="Points" data={data.challenge.points.toString()} />
            <SameLineInfoDisplay heading="Division" data={data.challenge.division.join(", ")} />
            { data.challenge.hints ?
                <TableInfoDisplay heading="Hints" thead={["", "Cost"]} data={data.challenge.hints?.map((hint: Hint) => [hint.hint, hint.point_cost])} /> :
                <SameLineInfoDisplay heading="Hints" data="" />
            }
            <SameLineInfoDisplay heading="Flag" data={data.challenge.flag} />
            <SameLineInfoDisplay heading="Flag Case Sensitivity" data={data.challenge.is_flag_case_sensitive ? "Sensitive" : "Insensitive"} />
            <NextLineInfoDisplay heading="Solution Explanation" data={data.challenge.solution_explanation ? data.challenge.solution_explanation : ''} />
            <NextLineInfoDisplay heading="File" data="will be added as a feature soon" />
        </div>

    </Stack>
    </>;
}