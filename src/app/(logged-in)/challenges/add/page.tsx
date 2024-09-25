"use client"

import { challenges } from "@/types/challenges.types";
import { Stack, Heading, Input, Text, Box, Textarea, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberInput, NumberIncrementStepper, Select, Button } from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";


export default function Page() {
  const [formData, setFormData] = useState<challenges>({
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

  return (
    <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            Create Challenge
        </Heading>
        <form className="w-full max-w-96">
            <Box className="mb-6">
                <Text className="mb-2" as="b">Name</Text>
                <Input placeholder="Name of challenge" name="name" value={formData.challenge_name} onChange={handleInputChange} required/>
            </Box>
            
            <Box className="mb-6">
                <Text className="mb-2" as="b">Description</Text>
                <Textarea placeholder="Description of challenge" name="description" value={formData.challenge_description} onChange={handleInputChange}/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Flag</Text>
                <Input name="flag_format" value={formData.flag} onChange={handleInputChange}/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Division</Text>
                <Select placeholder='Select division' value={formData.division.map(String)} onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        division: e.target.value.split(",").map(Number),
                                    });
                }}>
                    <option value="1,2">Both</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </Select>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Points</Text>
                <NumberInput defaultValue={100} step={10} name="points" value={formData.points} onChange={(_, valueAsNumber) => {
                    setFormData({...formData, points: valueAsNumber});
                }}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Category</Text>
                <Select placeholder='Select category' name="category" value={formData.category} onChange={handleInputChange}>
                    <option value='option1'>Category 1</option>
                    <option value='option2'>Category 2</option>
                </Select>
            </Box>

            <Box className="mb-12">
                <Text className="mb-2" as="b">Hint (optional)</Text>                
                {
                    formData.hints.map(
                        (hint, map_index) => (
                            <>

                                <Text className="mb-2 block font-semibold">Hint {map_index+1}</Text>
                                <Text className="mb-2">Point cost</Text>
                                <NumberInput defaultValue={10} step={1} className="mb-2" value={hint.cost} onChange={(_, valueAsNumber) => {
                                    setFormData({
                                        ...formData,
                                        hints: [
                                            ...formData.hints.slice(0, map_index),
                                            {
                                                value: hint.value,
                                                cost: valueAsNumber,
                                            },
                                            ...formData.hints.slice(map_index+1)
                                        ]
                                    });
                                }}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Textarea placeholder="" className="mb-2" value={hint.value} onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        hints: [
                                            ...formData.hints.slice(0, map_index),
                                            {
                                                value: e.target.value,
                                                cost: hint.cost,
                                            },
                                            ...formData.hints.slice(map_index+1)
                                        ]
                                    });
                                }}/>
                                <Button colorScheme="red" className="mb-4" onClick={() => {
                                    setFormData({...formData, hints: formData.hints.filter((_, filter_index) => map_index !== filter_index)});
                                }}>
                                    Remove hint
                                </Button>
                            </>
                        )
                    )
                }
                
                {
                    (formData.hints.length < 2) && (
                        <Button className="float-end" onClick={() => {
                            if (formData.hints.length < 2){
                                setFormData({...formData, hints: [...formData.hints, {value:"", cost:10}]});
                            }
                        }}>
                            Add hint
                        </Button>
                    )
                }
            </Box>

            <Box className="mb-6 flex flex-col">
                <Text className="mb-2" as="b">File Attachment</Text>
                <input 
                    type="file" 
                    className="file:cursor-pointer w-max file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold" 
                    name="file_attachment"
                    onChange={(e) => {
                        setFormData({...formData, file_attachment: e.target.files && e.target.files[0]})
                    }}

                />
            </Box>

            <Button className="w-full" colorScheme="blue">Add Challenge</Button>



            
        </form>

    </Stack>
  );
}