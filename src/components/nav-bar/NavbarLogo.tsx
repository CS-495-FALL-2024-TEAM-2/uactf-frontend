import { Box, Text } from "@chakra-ui/react";

export default function NavbarLogo(){
    return (
        <Box>
            <Text className='md:hidden' as='b' color='UA_red'>UACTF</Text>
            <Text className='hidden md:block' as='b' color='UA_red'>UA Capture The Flag</Text>
        </Box>
    );
}