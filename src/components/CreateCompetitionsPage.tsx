"use client"

import { useCreateCompetition } from "@/hooks/competitions.hooks";
import { CreateCompetitionRequest } from "@/types/competitions.types";
import { Heading, Input, Button, Stack, FormControl, FormLabel, FormHelperText, Switch, Flex, Alert, AlertTitle, AlertIcon, AlertDescription, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function CreateCompetitionsPage(){
    const defaultFormValues: CreateCompetitionRequest = {
        competition_name: '',
        registration_deadline: '',
        is_active: false
    };

    // hooks
    const toast = useToast();
    const [formData, setFormData] = useState<CreateCompetitionRequest>(defaultFormValues);
    const [formErrorAlert, setFormErrorAlert] = useState<string | null>(null);
    const {mutate: createCompetition, isPending: createCompetitionIsPending} = useCreateCompetition(
        (data) => {
            setFormErrorAlert(null);
            setFormData(defaultFormValues);
            toast({
                title: 'Competition created.',
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        },
        (error) => {
            setFormErrorAlert(error.message);
        }
    );


    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }



    const createCompetitionEventHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        // validation
        if (!form.checkValidity()){
            form.reportValidity();
            return;
        }


        //TODO: probably add validation to check for when registration deadline has passed and we're setting is_active to true
        createCompetition(formData);
    }

    return (
        <Stack className="p-4 mt-4" align={"center"}>
            <Heading className="mb-8">Create Competition</Heading>
            <form className="w-full max-w-96" onSubmit={createCompetitionEventHandler} noValidate>
                {formErrorAlert &&
                    <Alert status='error' className="mb-6">
                        <AlertIcon />
                        <AlertTitle>An error occurred!</AlertTitle>
                        <AlertDescription>{formErrorAlert}</AlertDescription>
                    </Alert>
                }
                <FormControl className="mb-6">
                    <FormLabel className="mb-2" as="b">Name of Competition</FormLabel>
                    <Input
                        placeholder="Capture the Flag 2024"
                        name="competition_name"
                        value={formData.competition_name}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>

                <FormControl className="mb-6">
                    <FormLabel className="mb-2" as="b">Registration Deadline</FormLabel>
                    <Input
                        type="date"
                        placeholder="Registration Deadline"
                        name="registration_deadline"
                        value={formData.registration_deadline}
                        onChange={handleInputChange}
                        required
                    />
                </FormControl>

                <FormControl className="mb-6">
                    <Flex>
                        <FormLabel>Mark competition as ongoing?</FormLabel>
                        <Switch
                            name='is_active'
                            isChecked={formData.is_active}
                            onChange={(e) => {
                                setFormData({...formData, is_active: e.currentTarget.checked});
                            }}
                        />
                    </Flex>

                    <FormHelperText>Teachers will be able to register for this competition if the toggle is switched on</FormHelperText>

                </FormControl>

                <Button
                    type="submit"
                    className="w-full"
                    colorScheme="blue"
                    isLoading={createCompetitionIsPending}
                >
                    Create Competition
                </Button>
            </form>
        </Stack>
    );
}
