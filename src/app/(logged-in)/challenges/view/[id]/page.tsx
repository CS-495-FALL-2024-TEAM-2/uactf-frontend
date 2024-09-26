import NextLineInfoDisplay from "@/components/NextLineInfoDisplay";
import SameLineInfoDisplay from "@/components/SameLineInfoDisplay";
import TableInfoDisplay from "@/components/TableInfoDisplay";
import { Hint } from "@/types/challenges.types";
import { mockChallenges } from "@/utils/mockData/challengesData";
import { Heading, Stack } from "@chakra-ui/react";

export default function Page({ params }: { params: { id: string } }) {

    const getData = (id: string) => {
        return mockChallenges.filter((challenge) => challenge.challenge_id.toString() == id)[0]
    }

    const challengeData = getData(params.id)

    return <>
        <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            {challengeData.challenge_name.toUpperCase()}
        </Heading>
        <div className="w-full max-w-96">
            <NextLineInfoDisplay heading="Description" data={challengeData.challenge_description}/>
            <SameLineInfoDisplay heading="Category" data={challengeData.category} />
            <SameLineInfoDisplay heading="Points" data={challengeData.points.toString()} />
            <SameLineInfoDisplay heading="Division" data={challengeData.division.join(", ")} />
            <TableInfoDisplay heading="Hints" thead={["", "Cost"]} data={challengeData.hints.map((hint: Hint) => [hint.hint, hint.point_cost])} />
            <SameLineInfoDisplay heading="Flag" data={challengeData.flag} />
            <SameLineInfoDisplay heading="Flag Case Sensitivity" data={challengeData.is_flag_case_sensitive ? "Sensitive" : "Insensitive"} />
            <NextLineInfoDisplay heading="Solution Explanation" data={challengeData.solution_explanation ? challengeData.solution_explanation : ''} />
            <NextLineInfoDisplay heading="File" data="will be added as a feature soon" />
        </div>

    </Stack>
    </>;
}