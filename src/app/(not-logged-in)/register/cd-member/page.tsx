import RegisterCrimsonDefense from '@/components/register/RegisterCrimsonDefense';
import { Box } from '@chakra-ui/react';

export default function Page() {
  return (
    <Box
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={1}
      flexGrow={1}
    >
      <RegisterCrimsonDefense />
    </Box>
  );
}
