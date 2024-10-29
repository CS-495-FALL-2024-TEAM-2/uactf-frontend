import { CDMemberRegisterFormData } from '@/types/forms.types';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function RegisterCDMembersForm({
  setCDMemberFormInput,
  setCurrentStep,
}: {
  setCDMemberFormInput: React.Dispatch<
    React.SetStateAction<CDMemberRegisterFormData | null>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [formData, setFormData] = React.useState<
    CDMemberRegisterFormData
  >({
    email: '',
  });

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    // validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (
      !formData.email.includes('@crimson.ua.edu') &&
      !formData.email.includes('@ua.edu')
    ) {
      setErrorMessage('Please register using your crimson email!');
      return;
    }

    setCDMemberFormInput(formData);
    setCurrentStep(1);
  };

  return (
    <Box
      bg="white"
      className="w-full md:w-1/3"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      padding={4}
    >
      <Stack spacing={1}>
        <Text
          fontSize="2xl"
          as="b"
          textAlign="center"
          color="gray.800"
        >
          Crimson Defense Member Registration
        </Text>

        <form className="w-full" onSubmit={handleSubmit} noValidate>
          <Stack>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Crimson Email</FormLabel>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </FormControl>

            {errorMessage && (
              <Alert status="error" className="mb-6">
                <AlertIcon />
                <AlertTitle>An error occurred!</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <Box
              width="full"
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <Button type="submit" colorScheme="blue" width={40}>
                Register
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
