import RegisterTeacher from '@/components/register/RegisterTeacher';
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
      <RegisterTeacher />
    </Box>
  );
}
