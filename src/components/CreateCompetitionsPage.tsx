"use client"

import { Box, Heading, Input, Text, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

export default function CreateCompetitionsPage(){
    const defaultFormValues = {};

    // hooks
    const [formData, setFormData] = useState(defaultFormValues);
    const [formErrorAlert, setFormErrorAlert] = useState<string | null>(null);

    return (
        <Stack className="p-4 mt-4" align={"center"}>
            <Heading className="mb-8">Create Competition</Heading>
            <form className="w-full max-w-96" noValidate>
                <Box className="mb-6">
                    <Text className="mb-2" as="b">Name of Competition</Text>
                    <Input placeholder="Capture the Flag 2024" name="competition_name" required/>
                </Box>
                
                <Box className="mb-6">
                    <Text className="mb-2" as="b">Registration Deadline</Text>
                    <Input type="date" placeholder="Registration Deadline" name="registration_deadline" required/>
                </Box>
                
                <Button type="submit" className="w-full" colorScheme="blue">Create Competition</Button>
            </form>
        </Stack>
    );
}