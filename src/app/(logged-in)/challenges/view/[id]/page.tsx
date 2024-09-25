import { mockChallenges } from "@/utils/mockData/challengesData";
import { Box, Flex, Heading, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";

export default function Page({ params }: { params: { id: string } }) {

    const getData = (id: string) => {
        return mockChallenges.filter((challenge) => challenge.challenge_id.toString() == id)[0]
    }

    const challengeData = getData(params.id)

    return <>
        <Stack className="p-4 mt-4" align={"center"}>
        <Heading as='h1' size='lg' className="mb-4">
            {challengeData.challenge_name.toUpperCase()}
        </Heading>
        <div className="w-full max-w-96">
            <Box className="mb-6">
                <Text className="mb-2" as="b">Description:</Text>
                <Text className="mb-2">{challengeData.challenge_description}</Text>
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">Category:</Text>
                    <Text className="mb-2">{challengeData.category}</Text>
                </Flex>
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">Points:</Text>
                    <Text className="mb-2">{challengeData.points}</Text>
                </Flex>
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">Division:</Text>
                    <Text className="mb-2">{challengeData.division.join(", ")}</Text>
                </Flex>
            </Box>
            <Box className="mb-6">
                <Text className="mb-2 pr-2" as="b">Hints:</Text>
                <Table>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Cost</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {challengeData.hints ? challengeData.hints.map((hint, index) => (
                            <Tr key={index}>
                                <Td className="wrap">{hint.value}</Td>
                                <Td isNumeric>{hint.cost}</Td>
                            </Tr>
                        )) : ""}
                    </Tbody>
                </Table>  
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">Flag:</Text>
                    <Text className="mb-2">{challengeData.flag}</Text>
                </Flex>
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">Flag Case Sensitivity:</Text>
                    <Text className="mb-2">{challengeData.is_flag_case_sensitive ? "Sensitive" : "Insensitive"}</Text>
                </Flex>
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">Solution Explanation:</Text>
                    <Text className="mb-2">{challengeData.solution_explanation}</Text>
                </Flex>
            </Box>
            <Box className="mb-6">
                <Flex>
                    <Text className="mb-2 pr-2" as="b">File:</Text>
                    <Text className="mb-2">will be added as a feature soon</Text>
                </Flex>
            </Box>
        </div>

    </Stack>
    </>;
}