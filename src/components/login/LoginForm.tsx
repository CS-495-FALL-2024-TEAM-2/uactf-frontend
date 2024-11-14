'use client';

import { CurrentUserContext, CurrentUserContextObjectType } from '@/contexts/current-user.context';
import { useLogin } from '@/hooks/accounts.hooks';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');


  const {setCurrentUser} = useContext(CurrentUserContext);

  const [formErrorAlert, setFormErrorAlert] = useState<string | null>();

  const router = useRouter();

  const { mutate: login, isPending: loginIsPending } = useLogin(
    (data) => {
      setFormErrorAlert(null);

      setCurrentUser({
        userRole: data.role
      });
      router.replace("/");
    },
    (error) => {
      setFormErrorAlert(error.message);
    }
  );


  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    // validation
    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }

    login({
      email: email,
      password: password
    });

    // set value in context
    console.log('Login form submitted', { email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={4}>
        <Text fontSize="3xl" as="b" textAlign="center" color="UA_red">
          Login
        </Text>
        {formErrorAlert && 
            <Alert status='error' className="mb-6">
                <AlertIcon />
                <AlertTitle>An error occurred!</AlertTitle>
                <AlertDescription>{formErrorAlert}</AlertDescription>
            </Alert>
        }
        <FormControl isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.currentTarget.value)}
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
          isLoading={loginIsPending}
        >
          Login
        </Button>

        <Center>
          <Link href="/forgot-password">Forgot Password?</Link>
        </Center>
        
      </Stack>
    </form>
  );
}
