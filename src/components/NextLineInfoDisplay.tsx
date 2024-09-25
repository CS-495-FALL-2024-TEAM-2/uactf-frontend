import { Box, Text } from "@chakra-ui/react";

export default function NextLineInfoDisplay({heading, data}: {heading: string, data: string}) {
    return <>
    <Box className="mb-6">
        <Text className="mb-2" as="b">{heading}:</Text>
        <Text className="mb-2">{data}</Text>
    </Box>
    </>
}