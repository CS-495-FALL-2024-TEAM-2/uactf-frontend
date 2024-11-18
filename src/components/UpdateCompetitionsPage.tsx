"use client"

import { useCreateCompetition, useGetCompetition, useUpdateCompetition } from "@/hooks/competitions.hooks";
import { CreateCompetitionRequest } from "@/types/competitions.types";
import { Heading, Input, Button, Stack, FormControl, FormLabel, FormHelperText, Switch, Flex, Alert, AlertTitle, AlertIcon, AlertDescription, useToast, Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function UpdateCompetitionsPage({
    competition_id
}: {
    competition_id: string
}){

    // hooks
    const toast = useToast();
    const {data} = useGetCompetition(competition_id);
    const [formData, setFormData] = useState<CreateCompetitionRequest>({
        competition_name: '',
        registration_deadline: '',
        is_active: false,
        liability_release_form_file: null
    });
    const [isFileChanged, setIsFileChanged] = useState<boolean>(false);
    const [isFileAttached, setIsFileAttached] = useState<boolean>(false);
    const [formErrorAlert, setFormErrorAlert] = useState<string | null>(null);
    const {mutate: updateCompetition, isPending: updateCompetitionIsPending} = useUpdateCompetition(
        (data) => {
            setFormErrorAlert(null);
            toast({
                title: 'Competition updated.',
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

    useEffect(() => {
        if (data){
            setFormData({
                competition_name: data.competition.competition_name,
                registration_deadline: convertDateToYYYYMMDD(data.competition.registration_deadline),
                is_active: data.competition.is_active,
                liability_release_form_file: null
            });
            if (data.competition.liability_release_form){
                setIsFileAttached(true);
            }
        }
    }, [data]);


    const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const convertDateToYYYYMMDD = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };



    const createCompetitionEventHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        // validation
        if (!form.checkValidity()){
            form.reportValidity();
            return;
        }


        //TODO: probably add validation to check for when registration deadline has passed and we're setting is_active to true
        updateCompetition({
            competition_id: competition_id,
            request_body: formData,
            is_liability_release_form_changed: isFileChanged
        });
    }

    return (
        <Stack className="p-4 mt-4" align={"center"}>
            <Heading className="mb-8">Update Competition</Heading>
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

                    {formData.is_active && <Alert status='warning' className="mt-4">
                        <AlertIcon />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>Setting this competition to "active" will deactivate other competitions</AlertDescription>
                    </Alert>}
                    
                </FormControl>

                <FormControl className="mb-6">
                    <FormLabel className="mb-2">File Attachment</FormLabel>
                    {isFileAttached && data.competition.liability_release_form ?
                        <Flex>
                            <Link className="mt-2" color='teal.500' href={data.competition.liability_release_form}>Liability Release Form</Link>
                            <Button colorScheme="red" className="ml-2" rounded={"50px"} onClick={() => {
                                setIsFileAttached(false);
                                setIsFileChanged(true);
                                setFormData({...formData, liability_release_form_file: null});
                            }}>Remove file</Button>
                        </Flex>
                        :
                        <input 
                            type="file" 
                            className="file:cursor-pointer w-max file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold" 
                            name="challenge_file_attachment"
                            onChange={(e) => {
                                setIsFileAttached(true);
                                setIsFileChanged(true);
                                setFormData({...formData, liability_release_form_file: e.target.files && e.target.files[0]})
                            }}

                        />
                    }
            
                </FormControl>

                <Button
                    type="submit"
                    className="w-full"
                    colorScheme="blue"
                    isLoading={updateCompetitionIsPending}
                >
                    Update Competition
                </Button>
            </form>
        </Stack>
    );
}
