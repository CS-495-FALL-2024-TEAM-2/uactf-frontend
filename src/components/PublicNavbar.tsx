import { Box, Flex, Text } from '@chakra-ui/react';

export default function PublicNavbar() {
  return (
    <Flex direction="row" bg="bama_gray" height="64px" px={4} alignItems="center">
      <Box>
        <Text className="md:hidden" as="b" color="UA_red">
          UACTF
        </Text>
        <Text className="hidden md:block" as="b" color="UA_red">
          UA Capture The Flag
        </Text>
      </Box>
    </Flex>
  );
}
