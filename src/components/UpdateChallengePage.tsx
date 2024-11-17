import AddOrUpdateChallengeForm from "@/components/add-challenge/AddOrUpdateChallengeForm";
import { Stack, Heading} from "@chakra-ui/react";

import * as React from "react";


export default function UpdateChallengePage({challengeId}: {challengeId: string}) {
  return (
    <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            Update Challenge
        </Heading>
        <AddOrUpdateChallengeForm isUpdateChallenge={true} challengeId={challengeId}/>
    </Stack>
  );
}
