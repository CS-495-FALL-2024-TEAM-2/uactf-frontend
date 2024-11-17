import { Box, Text } from "@chakra-ui/react";

export default function NextLineInfoDisplay({heading, data, children}: {heading: string, data?: string, children?:React.ReactNode}) {
    return <>
    <Box className="mb-6">
        <Text className="mb-2" as="b">{heading}:</Text>
        {children ? <Box>{children}</Box> : <Text className="mb-2">{data}</Text>}
    </Box>
    </>
}