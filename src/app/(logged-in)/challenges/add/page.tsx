<<<<<<< HEAD
import AddChallengeForm from "@/components/add-challenge/AddChallengeForm";
import { Stack, Heading} from "@chakra-ui/react";
=======
"use client"

import { Challenges } from "@/types/challenges.types";
import { Stack, Heading, Input, Text, Box, Textarea, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberInput, NumberIncrementStepper, Select, Button } from "@chakra-ui/react";
>>>>>>> 15f736a (16:)
import * as React from "react";


export default function Page() {
<<<<<<< HEAD
=======
  const [formData, setFormData] = useState<Challenges>({
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

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

>>>>>>> 15f736a (16:)
  return (
    <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            Create Challenge
        </Heading>
        <AddChallengeForm />
    </Stack>
  );
}