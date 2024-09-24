'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function LoginForm() {
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}
