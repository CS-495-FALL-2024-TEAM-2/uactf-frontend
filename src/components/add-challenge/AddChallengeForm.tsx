"use client"

import { Stack, Heading, Input, Text, Box, Textarea, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberInput, NumberIncrementStepper, Select, Button, Alert, AlertIcon, AlertTitle, AlertDescription, useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";

export default function AddChallengeForm(){
    type Hint = {
        hint: string,
        point_cost: number
    };
    type CreateChallengeFormData = {
        challenge_name: string;
        points: number;
        challenge_description: string;
        flag: string;
        is_flag_case_sensitive: boolean;
        division: string;
        challenge_category: string;
        solution_explanation: string;
        hints: Hint[];
        // file_attachment: File | null;
    };

    type CreateChallengeRequest = {
        challenge_name: string;
        points: number;
        creator_name: string;
        division: number[];
        challenge_description: string;
        flag: string;
        is_flag_case_sensitive: boolean;
        challenge_category: string;
        verified: boolean;
        solution_explanation: string;
        hints: Hint[];
        // file_attachment: File | null;
    };

    const defaultFormValues: CreateChallengeFormData = {
        challenge_name: '',
        challenge_description: '',
        flag: '',
        is_flag_case_sensitive: false,
        division: '',
        points: 100,
        challenge_category: '',
        solution_explanation: '',
        hints: [],
        // file_attachment: null
    };


    const [formData, setFormData] = useState<CreateChallengeFormData>(defaultFormValues);

    const [formErrorAlert, setFormErrorAlert] = useState<string | null>(null);

    const toast = useToast();

    const setErrorMessage = (errorMessage: string) => {
        setFormErrorAlert(errorMessage);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const addChallengeEventHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        // validation
        if (!form.checkValidity()){
            form.reportValidity();
            return;
        }

        const flag_is_formatted_properly = /^uactf\{.*\}$/.test(formData.flag);
        if (!flag_is_formatted_properly){
            setErrorMessage("Flag format should be in format: uactf{<flag>}");
            return;
        }

        const map_division_form_value_to_backend_value: {
            [key: string]: number[];
        } = {
            'all': [1,2],
            '1': [1],
            '2': [2]
        }

        const request_body: CreateChallengeRequest = {
            ...formData,
            creator_name: '', // TODO: put actual user name
            division: map_division_form_value_to_backend_value[formData.division],
            verified: false // TODO: this will automatically be true for super-admins and false for ua cd members
        }
        
        createChallengeMutation.mutate(request_body);
    }

    const createChallenge = async (request_body: CreateChallengeRequest) => {
        console.log(JSON.stringify(request_body))
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges/create`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request_body),
            }
        );

        return await response.json();
    };


    const createChallengeMutation = useMutation({
        mutationFn: createChallenge,
        onSuccess: (data) => {
            console.log('data:',data);
            setFormErrorAlert(null);
            setFormData(defaultFormValues);
            toast({
                title: 'Challenge created.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        onError: (error) => {
            console.log('error:' ,error);
            setErrorMessage(error.message);
        },
    });

    return (
        <form className="w-full max-w-96" onSubmit={addChallengeEventHandler} noValidate>
            {formErrorAlert && 
                <Alert status='error' className="mb-6">
                    <AlertIcon />
                    <AlertTitle>An error occurred!</AlertTitle>
                    <AlertDescription>{formErrorAlert}</AlertDescription>
                </Alert>
            }

            <Box className="mb-6">
                <Text className="mb-2" as="b">Name</Text>
                <Input placeholder="Name of challenge" name="challenge_name" value={formData.challenge_name} onChange={handleInputChange} required/>
            </Box>
            
            <Box className="mb-6">
                <Text className="mb-2" as="b">Description</Text>
                <Textarea placeholder="Description of challenge" name="challenge_description" value={formData.challenge_description} onChange={handleInputChange} required/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Flag format</Text>
                <Input name="flag" value={formData.flag} onChange={handleInputChange} required/>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Is flag case-sensitive?</Text>
                <Select name="is_flag_case_sensitive" value={formData.is_flag_case_sensitive ? 'true' : 'false'} onChange={(e) => {
                    const newVal = e.target.value;
                    setFormData({...formData, is_flag_case_sensitive: newVal === 'true' ? true : false})
                }} required>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                </Select>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Division</Text>
                <Select placeholder='Select division' name="division" value={formData.division} onChange={handleInputChange} required>
                    <option value='all'>Both</option>
                    <option value='1'>Division 1</option>
                    <option value='2'>Division 2</option>
                </Select>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Points</Text>
                <NumberInput defaultValue={100} step={10} name="points" value={formData.points} onChange={(_, valueAsNumber) => {
                    setFormData({...formData, points: valueAsNumber});
                }} isRequired={true}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Category</Text>
                <Select placeholder='Select category' name="challenge_category" value={formData.challenge_category} onChange={handleInputChange} required>
                    <option value='Crimson Challenge'>Crimson Challenge</option>
                    <option value='Cryptography'>Cryptography</option>
                    <option value='Forensics'>Forensics</option>
                    <option value='Network & Log Analysis'>Network & Log Analysis</option>
                    <option value='OSINT'>OSINT</option>
                    <option value='Password Cracking'>Password Cracking</option>
                    <option value='Reverse Engineering'>Reverse Engineering</option>
                    <option value='Steganography'>Steganography</option>
                    <option value='Thank You to our Donors'>Thank You to our Donors</option>
                </Select>
            </Box>

            <Box className="mb-6">
                <Text className="mb-2" as="b">Solution (optional)</Text>
                <Textarea placeholder="Solution to challenge" name="solution_explanation" value={formData.solution_explanation} onChange={handleInputChange}/>
            </Box>

            <Box className="mb-12">
                <Text className="mb-2" as="b">Hint (optional)</Text>                
                {
                    formData.hints.map(
                        (hint, map_index) => (
                            <>

                                <Text className="mb-2 block font-semibold">Hint {map_index+1}</Text>
                                <Text className="mb-2">Point cost</Text>
                                <NumberInput defaultValue={10} step={1} className="mb-2" value={hint.point_cost} onChange={(_, valueAsNumber) => {
                                    setFormData({
                                        ...formData,
                                        hints: [
                                            ...formData.hints.slice(0, map_index),
                                            {
                                                hint: hint.hint,
                                                point_cost: valueAsNumber,
                                            },
                                            ...formData.hints.slice(map_index+1)
                                        ]
                                    });
                                }} isRequired={true}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                                <Textarea placeholder="" className="mb-2" value={hint.hint} onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        hints: [
                                            ...formData.hints.slice(0, map_index),
                                            {
                                                hint: e.target.value,
                                                point_cost: hint.point_cost,
                                            },
                                            ...formData.hints.slice(map_index+1)
                                        ]
                                    });
                                }} required />
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
                                setFormData({...formData, hints: [...formData.hints, {hint:"", point_cost:10}]});
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
                    // onChange={(e) => {
                    //     setFormData({...formData, file_attachment: e.target.files && e.target.files[0]})
                    // }}

                />
            </Box>

            <Button type="submit" className="w-full" colorScheme="blue" isLoading={createChallengeMutation.isPending}>Add Challenge</Button>



            
        </form>
    );
}