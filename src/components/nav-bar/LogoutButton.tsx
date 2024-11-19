import { useLogout } from '@/hooks/accounts.hooks';
import {
  Box,
  Button,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: logout, isPending } = useLogout(
    (data) => {
      router.replace('/login');
    },
    (error) => {
      toast({
        title: 'Error',
        position: 'top',
        description: 'Error logging out. Please try again',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  );

  return (
    <Button
      size="sm"
      bg={useColorModeValue('bama_gray', 'black')}
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
}
