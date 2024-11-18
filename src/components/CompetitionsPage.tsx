"use client"

import NextLink from "next/link"; 
import { useGetCompetitions } from "@/hooks/competitions.hooks";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Link, SimpleGrid, Text } from "@chakra-ui/react";

export default function CompetitionsPage(){
    const {isPending, error, data} = useGetCompetitions();
    
    return (
        <Box
            className="p-8"
        >
            <Flex className="w-full" justifyContent="space-between" flexDirection={{base: "column", md:"row"}}>
                <Heading>Competitions</Heading>
                <NextLink href="/competitions/create">
                    <Button colorScheme="green" className="mt-4 md:mt-0">Create competition</Button>
                </NextLink>
                
            </Flex>
            {error && 
                    <Alert status='error' className="mb-6">
                        <AlertIcon />
                        <AlertTitle>An error occurred!</AlertTitle>
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                }

            <SimpleGrid className="mt-4" spacing={4} columns={{sm: 1, md: 2, xl: 3}}>
                
                {
                    isPending ? <div>loading</div>
                    
                    :
                    data?.competitions.map((competition) => {
                        return (
                            <Card variant="outline" key={competition.competition_id}>
                                <CardHeader>
                                    <Heading size='md'>{competition.competition_name}</Heading>
                                </CardHeader>
                                <CardBody>
                                    <Text>Registration deadline: {competition.registration_deadline}</Text>
                                    <Text>Currently ongoing: {competition.is_active ? "Yes" : "No"}</Text>
                                    <Text>Liability Release form:</Text> 
                                    <Link href={competition.liability_release_form} color='teal.500' target="_blank">{competition.liability_release_form}</Link>
                                </CardBody>
                                {
                                    competition.is_active &&
                                    <CardFooter>
                                        <NextLink href={`/competitions/update/${competition.competition_id}`}>
                                            <Button colorScheme="blue">Edit</Button>
                                        </NextLink>
                                    </CardFooter>
                                
                                }
                            </Card>
                        );
                    })
                }

                {
                    data?.competitions.length == 0 && <Text>No competitions created yet</Text>
                }
            </SimpleGrid>
        </Box>
    );
}