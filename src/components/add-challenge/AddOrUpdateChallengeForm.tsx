"use client"

import { useCreateChallenge, useGetChallengeDetails, useUpdateChallenge } from "@/hooks/challenges.hooks";
import { CreateChallengeRequest } from "@/types/challenges.types";
import { CreateChallengeFormData } from "@/types/forms.types";
import { Input, Text, Box, Textarea, NumberInputField, NumberInputStepper, NumberDecrementStepper, NumberInput, NumberIncrementStepper, Select, Button, Alert, AlertIcon, AlertTitle, AlertDescription, useToast, Link, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types'



export default function AddOrUpdateChallengeForm(
    {isUpdateChallenge = false, challengeId}:
    {isUpdateChallenge?: boolean, challengeId?: string}
){
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
        challenge_file_attachment: null
    };

    // hooks
    const [formData, setFormData] = useState<CreateChallengeFormData>(defaultFormValues);
    const [isFileChanged, setIsFileChanged] = useState<boolean>(false);
    const [isFileAttached, setIsFileAttached] = useState<boolean>(false);

    const [formErrorAlert, setFormErrorAlert] = useState<string | null>(null);

    const toast = useToast();

    const {error, data} = useGetChallengeDetails(challengeId ?? "", challengeId !== undefined);

    useEffect(() => {
        if (error){
            toast({
                title: 'Error fetching challenge details',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

        if (data){
            const {challenge} = data;
            if (challenge){
                setFormData({
                    challenge_name: challenge.challenge_name,
                    challenge_description: challenge.challenge_name,
                    flag: challenge.flag,
                    is_flag_case_sensitive: challenge.is_flag_case_sensitive,
                    division: JSON.stringify(challenge.division),
                    points: challenge.points,
                    challenge_category: challenge.challenge_category,
                    solution_explanation: challenge.solution_explanation ?? '',
                    hints: challenge.hints ?? [],
                    challenge_file_attachment: null
                });
                if (challenge.challenge_file_attachment){
                    setIsFileAttached(true);
                }
            } else {
                console.log(`challenge with id, ${challengeId}, does not exist`);
            }

        }

    }, [data]);

    const {mutate: createChallenge, isPending: createChallengeIsPending} = useCreateChallenge(
        (data) => {
            setFormErrorAlert(null);
            setFormData(defaultFormValues);
            toast({
                title: 'Challenge created.',
                position: 'top',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        (error) => {
            setErrorMessage(error.message);
        }
    );

    const {mutate: updateChallenge, isPending: updateChallengeIsPending} = useUpdateChallenge(
        (data) => {
            setFormErrorAlert(null);
            toast({
                title: 'Challenge updated.',
                position: 'top',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        },
        (error) => {
            setErrorMessage(error.message);
        }
    );


    // functions
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


        const request_body: CreateChallengeRequest = {
            ...formData,
            creator_name: '', // TODO: put actual user name
            division: JSON.parse(formData.division),
            verified: false // TODO: this will automatically be true for super-admins and false for ua cd members
        }

        if (isUpdateChallenge){
            // possible error here with empty string challenge id. this would never happen
            // in real life scenario but it theoretically could
            updateChallenge({
                challenge_id: challengeId ?? "",
                request_body,
                is_challenge_file_changed: isFileChanged
            });
        } else {
            createChallenge(request_body);
        }
    }


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
                    <option value='[1,2]'>Both</option>
                    <option value='[1]'>Division 1</option>
                    <option value='[2]'>Division 2</option>
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
                {isFileAttached && data?.challenge?.challenge_file_attachment ?
                    <Flex>
                        <Link className="mt-2" color='teal.500' href={data?.challenge?.challenge_file_attachment}>Challenge File</Link>
                        <Button colorScheme="red" className="ml-2" rounded={"50px"} onClick={() => {
                            setIsFileAttached(false);
                            setIsFileChanged(true);
                            setFormData({...formData, challenge_file_attachment: null});
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
                            setFormData({...formData, challenge_file_attachment: e.target.files && e.target.files[0]})
                        }}
                    />
                }
            </Box>

            <Button type="submit" className="w-full" colorScheme="blue" isLoading={isUpdateChallenge ? updateChallengeIsPending : createChallengeIsPending}>
                {isUpdateChallenge ? "Update challenge" : "Add Challenge"}
            </Button>

        </form>
    );
}

AddOrUpdateChallengeForm.propTypes = {
    isUpdateChallenge: PropTypes.bool,
    challengeId: function(props: { [key: string]: any }, propName: string, componentName: string) {
        if (props.isUpdateChallenge === true && props[propName] == null) {
            return new Error(
            `Invalid prop \`${propName}\` supplied to \`${componentName}\`. When \`isUpdateChallenge\` is true, \`${propName}\` cannot be null.`
            );
        }
    }
};
