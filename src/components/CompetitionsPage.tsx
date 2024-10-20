import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

export default function CompetitionsPage(){
    const competitions = [
        {
            id: 1,
            name: 'Capture the Flag 2023',
            registration_deadline: "October 20, 2023",
            is_active: true,
        },
        {
            id: 2,
            name: 'Capture the Flag 2022',
            registration_deadline: "October 20, 2023",
            is_active: false,
        },
        {
            id: 3,
            name: 'Capture the Flag 2021',
            registration_deadline: "October 20, 2021",
            is_active: false,
        },
        {
            id: 4,
            name: 'Capture the Flag 2020',
            registration_deadline: "October 20, 2020",
            is_active: false,
        },
        {
            id: 5,
            name: 'Capture the Flag 2019',
            registration_deadline: "October 20, 2019",
            is_active: false,
        },
    ];
    return (
        <Box
            className="p-8"
        >
            <Flex className="w-full" justifyContent="space-between" flexDirection={{base: "column", md:"row"}}>
                <Heading>Competitions</Heading>
                <Button colorScheme="green" className="mt-4 md:mt-0">Create competition</Button>
            </Flex>

            <SimpleGrid className="mt-4" spacing={4} columns={{sm: 1, md: 2, xl: 3}}>
            {
                competitions.map((competition) => {
                    return (
                        <Card variant="outline" key={competition.id}>
                            <CardHeader>
                                <Heading size='md'>{competition.name}</Heading>
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