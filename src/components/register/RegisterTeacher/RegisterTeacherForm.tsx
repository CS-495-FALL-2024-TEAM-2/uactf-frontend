'use client';

import { TeacherRegisterFormData } from '@/types/forms.types';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function RegisterTeacherForm({
  setTeacherRegisterFormInput,
  setCurrentStep,
}: {
  setTeacherRegisterFormInput: React.Dispatch<
    React.SetStateAction<TeacherRegisterFormData | null>
  >;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [addTeamMembersNow, setAddTeamMembersNow] = React.useState(
    false
  );

  const [formData, setFormData] = React.useState<
    TeacherRegisterFormData
  >({
    school_name: '',
    first_name: '',
    last_name: '',
    email: '',
    contact_number: '',
    shirt_size: '',
  });

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    // validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setTeacherRegisterFormInput(formData);

    // If the user doesnt want to add team members now, skip the next step
    if (addTeamMembersNow) {
      setCurrentStep(1);
      return;
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <Box
      bg="white"
      className="w-full lg:w-7/12"
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
          University of Alabama
        </Text>
        <Text
          fontSize="2xl"
          as="b"
          textAlign="center"
          color="gray.800"
        >
          Capture the Flag Competition
        </Text>
        <Text
          fontSize="2xl"
          as="b"
          textAlign="center"
          color="gray.800"
        >
          UACTF 2024
        </Text>
      </Stack>

      <form className="w-full" onSubmit={handleSubmit} noValidate>
        <Stack>
          <Text
            fontSize="2xl"
            as="b"
            textAlign="center"
            color="gray.800"
          >
            Registration Page
          </Text>

          <hr />

          <FormControl isRequired>
            <FormLabel htmlFor="school_name">School Name</FormLabel>
            <Input
              type="text"
              name="school_name"
              id="school_name"
              maxWidth="1264px"
              onChange={handleInputChange}
            />
          </FormControl>

          <hr />

          <FormLabel>
            Instructor / School Representative Information
          </FormLabel>
          <FormControl isRequired>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel htmlFor="first_name">First Name</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  onChange={handleInputChange}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={handleInputChange}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel htmlFor="email">Email</FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel htmlFor="contact_number">
                  Contact Number
                </FormLabel>
              </GridItem>
              <GridItem>
                <Input
                  type="tel"
                  name="contact_number"
                  id="contact_number"
                  onChange={handleInputChange}
                />
              </GridItem>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <Grid templateColumns="repeat(2, 1fr)">
              <GridItem>
                <FormLabel htmlFor="shirt_size">Shirt Size</FormLabel>
              </GridItem>
              <GridItem>
                <Select
                  name="shirt_size"
                  id="shirt_size"
                  onChange={handleInputChange}
                  required
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra large">Extra Large</option>
                </Select>
              </GridItem>
            </Grid>
          </FormControl>

          <hr />

          <FormLabel>Add Team Members Now?</FormLabel>
          <Button
            type="button"
            className={`${addTeamMembersNow ? 'brightness-50' : ''}`}
            bg="bama_gray"
            color="black"
            width="full"
            onClick={() => setAddTeamMembersNow(true)}
          >
            Yes
          </Button>
          <Button
            type="button"
            className={`${!addTeamMembersNow ? 'brightness-50' : ''}`}
            color="black"
            bg="bama_gray"
            width="full"
            onClick={() => setAddTeamMembersNow(false)}
          >
            No
          </Button>

          <hr />

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
    </Box>
  );
}
