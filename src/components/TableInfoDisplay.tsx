import { Box, Table,Text, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";


export default function SameLineInfoDisplay({heading, thead, data}: {heading: string, thead: string[], data: (string|number)[][] | []}) {
    return <>
    <Box className="mb-6">
        <Text className="mb-2 pr-2" as="b">{heading}:</Text>
        <Table>
            <Thead>
                <Tr key="headings">
                    {thead.map((th) => (
                        <Th>{th}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data ? data.map((datapt, index) => (
                    <Tr key={index}>
                        {datapt.map((rowInfo) => (
                            <Td className={typeof rowInfo === 'number' ? '' : 'wrap'}>
                                {rowInfo}
                            </Td>
                        ))}
                    </Tr>
                )) : ""}
            </Tbody>
        </Table>  
        </Box>
    </>
}