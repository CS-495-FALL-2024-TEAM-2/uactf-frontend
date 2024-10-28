import { Box, Button, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function Page() {
  return (
    <Box
      display="flex"
      height="full"
      width="full"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
    >
      <Stack alignItems="center">
        <Text fontSize="3xl">Who are you registering as?</Text>
        <Link href="/register/teacher">
          <Button colorScheme="red" width={96}>Teacher</Button>
        </Link>
        <Link href="/register/cd-member">
          <Button colorScheme="red" width={96}>Crimson Defense Member</Button>
        </Link>
      </Stack>
    </Box>
  );
}
