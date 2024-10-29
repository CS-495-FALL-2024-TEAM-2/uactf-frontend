"use client"

import { useGetCompetitions } from "@/hooks/competitions.hooks";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function CompetitionsPage(){
    // const {isPending, error, data} = useGetCompetitions();
    const error = null;
    const isPending = false;
    const data = {
        competitions: [
            {
                competition_id: 1,
                competition_name: "Capture the Flag 2024",
                is_active: true,
                registration_deadline: "November 29th, 2024"
            },
            {
                competition_id: 1,
                competition_name: "Capture the Flag 2023",
                is_active: false,
                registration_deadline: "November 29th, 2023"
            },
            {
                competition_id: 1,
                competition_name: "Capture the Flag 2022",
                is_active: false,
                registration_deadline: "November 29th, 2022"
            },
            {
                competition_id: 1,
                competition_name: "Capture the Flag 2021",
                is_active: false,
                registration_deadline: "November 29th, 2021"
            },
            {
                competition_id: 1,
                competition_name: "Capture the Flag 2020",
                is_active: false,
                registration_deadline: "November 29th, 2020"
            },
            {
                competition_id: 1,
                competition_name: "Capture the Flag 2019",
                is_active: false,
                registration_deadline: "November 29th, 2019"
            }
        ]
    }
    return (
        <Box
            className="p-8"
        >
            <Flex className="w-full" justifyContent="space-between" flexDirection={{base: "column", md:"row"}}>
                <Heading>Competitions</Heading>
                <Button colorScheme="green" className="mt-4 md:mt-0">Create competition</Button>
            </Flex>

            <SimpleGrid className="mt-4" spacing={4} columns={{sm: 1, md: 2, xl: 3}}>
                {error && 
                    <Alert status='error' className="mb-6">
                        <AlertIcon />
                        <AlertTitle>An error occurred!</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                }
                {
                    isPending ? <div>loading</div>
                    
                    :
                    data.competitions.map((competition) => {
                        return (
                            <Card variant="outline" key={competition.competition_id}>
                                <CardHeader>
                                    <Heading size='md'>{competition.competition_name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>Registration deadline: {competition.registration_deadline}</Text>
                                    <Text>Currently ongoing: {competition.is_active ? "Yes" : "No"}</Text>

                                </CardBody>
                                {
                                    competition.is_active &&
                                    <CardFooter>
                                        <Button colorScheme="blue">Edit</Button>
                                    </CardFooter>
                                
                                }
                            </Card>
                        );
                    })
                }
            </SimpleGrid>
        </Box>
    );
}