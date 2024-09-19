import { Stack, Heading, Center, Input, Text, Box, Textarea, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberInput, NumberIncrementStepper, Select, Button } from "@chakra-ui/react";
import * as React from "react";

export default function Page() {
  return (
    <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            Create Challenge
        </Heading>
        <form className="w-full max-w-96">
            <Box className="mb-6">
                <Text className="mb-2" as="b">Name</Text>
                <Input placeholder="Name of challenge"/>
            </Box>
            
            <Box className="mb-6">
                <Text className="mb-2" as="b">Description</Text>
                <Textarea placeholder="Description of challenge"/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Flag format</Text>
                <Input/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Division</Text>
                <Input/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Division</Text>
                <Select placeholder='Select division'>
                    <option value='option1'>Both</option>
                    <option value='option2'>Division 1</option>
                    <option value='option3'>Division 2</option>
                </Select>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Points</Text>
                <NumberInput defaultValue={100} step={10}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Solution (optional)</Text>
                <Textarea placeholder="Solution to challenge"/>
            </Box>

            <Box className="mb-12">
                <Text className="mb-2" as="b">Hint (optional)</Text>
                <Text className="mb-2">Hint 1</Text>
                <Textarea placeholder="" className="mb-2"/>
                <Button className="float-end">Add extra hint</Button>
            </Box>

            <Box className="mb-6 flex flex-col">
                <Text className="mb-2" as="b">File Attachment</Text>
                <Button className="w-max" variant="outline">+ Add file</Button>
            </Box>

            <Button className="w-full">Add Challenge</Button>



            
        </form>

    </Stack>
  );
}