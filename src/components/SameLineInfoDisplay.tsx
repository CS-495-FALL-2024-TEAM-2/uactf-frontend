import { Box, Text, Flex } from "@chakra-ui/react";

export default function SameLineInfoDisplay({heading, data}: {heading: string, data: string}) {
    return <>
    <Box className="mb-6">
        <Flex>
            <Text className="mb-2 pr-2" as="b">{heading}:</Text>
            <Text className="mb-2">{data}</Text>
        </Flex>
    </Box>
    </>
}