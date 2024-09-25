import LoginForm from '@/components/login/LoginForm';
import { Box } from '@chakra-ui/react';

export default function Page() {
  return (
    <Box
      bg="gray.100"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexGrow={1}
      padding={1}
    >
      <Box
        className="w-full md:w-80"
        bg="white"
        borderRadius="md"
        shadow="md"
        padding={4}
      >
        <LoginForm />
      </Box>
    </Box>
  );
}
