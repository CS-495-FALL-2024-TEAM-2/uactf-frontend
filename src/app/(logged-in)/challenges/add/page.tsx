import AddChallengeForm from "@/components/add-challenge/AddChallengeForm";
import { Stack, Heading} from "@chakra-ui/react";
import * as React from "react";


export default function Page() {
  return (
    <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            Create Challenge
        </Heading>
        <AddChallengeForm />
    </Stack>
  );
}