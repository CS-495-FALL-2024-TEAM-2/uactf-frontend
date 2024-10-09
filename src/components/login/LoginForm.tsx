'use client';

import { CurrentUserContext, CurrentUserContextObjectType } from '@/contexts/current-user.context';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function LoginForm() {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const [isLoading, setIsLoading] = React.useState<boolean>(false);


  const {setCurrentUser} = useContext(CurrentUserContext);

  const router = useRouter();


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simulate api call to login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const apiResponse = {
      userId: "1",
      userRole: "teacher"
    };

    setCurrentUser(apiResponse);

    router.replace("/");

    // set value in context
    console.log('Login form submitted', { username, password });

     
  };

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={4}>
        <Text fontSize="5xl" as="b" textAlign="center" color="UA_red">
          Login
        </Text>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </FormControl>
        <Button
          type="submit"
          bg="bama_gray"
          color="black"
          width="full"
          isLoading={isLoading}
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}
