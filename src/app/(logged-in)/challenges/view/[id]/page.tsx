"use client"
import NextLineInfoDisplay from "@/components/NextLineInfoDisplay";
import SameLineInfoDisplay from "@/components/SameLineInfoDisplay";
import TableInfoDisplay from "@/components/TableInfoDisplay";
import { Challenges, Hint } from "@/types/challenges.types";
import { BASE_API_URI } from "@/utils/constants";
import { fetchData } from "@/utils/fetchData";
import { Heading, Stack } from "@chakra-ui/react";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
    const [data, setData] = React.useState<Challenges>({
        challenge_id: "0",
        challenge_name: '',
        challenge_description: '',
        flag: '',
        division: [],
        points: 100,
        category: '',
        hints: [],
        file_attachment: null,
        is_flag_case_sensitive: false,
        solution_explanation: null
      });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const endpoint = `${BASE_API_URI}/challenges/details?challenge_id=${params.id}`;
        
        const fetchAndSetData = async () => {
          setLoading(true);
          try {
            const fetchedData = await fetchData(endpoint);
            setData(fetchedData.challenge);
          } catch (err: any) {
            setError(err.message); // Handle error
          } finally {
            setLoading(false);
          }
        };
    
        fetchAndSetData();
      }, [])

    if (loading) return <div className="flex justify-center items-center h-100 text-bold">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-100 text-bold">Error: {error}</div>;
    return <>
        <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            {data.challenge_name.toUpperCase()}
        </Heading>
        <div className="w-full max-w-96">
            <NextLineInfoDisplay heading="Description" data={data.challenge_description}/>
            <SameLineInfoDisplay heading="Category" data={data.category} />
            <SameLineInfoDisplay heading="Points" data={data.points.toString()} />
            <SameLineInfoDisplay heading="Division" data={data.division.join(", ")} />
            { data.hints ?
                <TableInfoDisplay heading="Hints" thead={["", "Cost"]} data={data.hints?.map((hint: Hint) => [hint.hint, hint.point_cost])} /> :
                <SameLineInfoDisplay heading="Hints" data="" />
            }
            <SameLineInfoDisplay heading="Flag" data={data.flag} />
            <SameLineInfoDisplay heading="Flag Case Sensitivity" data={data.is_flag_case_sensitive ? "Sensitive" : "Insensitive"} />
            <NextLineInfoDisplay heading="Solution Explanation" data={data.solution_explanation ? data.solution_explanation : ''} />
            <NextLineInfoDisplay heading="File" data="will be added as a feature soon" />
        </div>

    </Stack>
    </>;
}