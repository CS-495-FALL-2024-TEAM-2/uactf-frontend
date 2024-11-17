'use client';

import { CurrentUserContext, CurrentUserContextObjectType } from '@/contexts/current-user.context';
import { useForgotPassword, useLogin } from '@/hooks/accounts.hooks';
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
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = React.useState<string>('');

  const [formErrorAlert, setFormErrorAlert] = useState<string | null>();

  const router = useRouter();

  const toast = useToast();

  const { mutate: forgotPassword, isPending: forgotPasswordIsPending } = useForgotPassword(
    (data) => {
        toast({
            title: 'A new password has been sent to your email. Use it to login!',
            position: 'top',
            status: 'success',
            duration: 7000,
            isClosable: true,
        });
    },
    (error) => {
      setFormErrorAlert(error.message);
    }
  );


  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    // validation
    if (!form.checkValidity()){
      form.reportValidity();
      return;
    }

    forgotPassword(email);
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <Stack spacing={4}>
        <Text fontSize="3xl" as="b" textAlign="center" color="UA_red">
          Forgot Password
        </Text>
        <Text as="small" textAlign="center">
          We will send a new password to your email if you already have an account with us
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
        <Button
          type="submit"
          bg="bama_gray"
          color="black"
          width="full"
          isLoading={forgotPasswordIsPending}
        >
          Send new password
        </Button>

        <Center>
          <Link href="/login">Go back to login</Link>
        </Center>

      </Stack>
    </form>
  );
}
