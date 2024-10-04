'use client';

import { AddTeamFormData } from '@/types/forms.types';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
} from '@chakra-ui/react';
import React from 'react';

export default function AddTeamForm({
  setTeamInfo,
  setCurrentStep,
}: {
  setTeamInfo: React.Dispatch<
    React.SetStateAction<AddTeamFormData | null>
  >;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [formData, setFormData] = React.useState<AddTeamFormData>({
    division: [1],
    is_virtual: false,
    team_members: [
      {
        first_name: '',
        last_name: '',
        email: '',
        shirt_size: '',
      },
    ],
  });

  const toggleDivision = (division: number) => {
    if (formData.division.includes(division)) {
      if (formData.division.length === 1) { // At least one division must be selected
        return;
      }
      setFormData({
        ...formData,
        division: formData.division.filter((d) => d !== division),
      });
    } else {
      setFormData({
        ...formData,
        division: [...formData.division, division],
      });
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    // validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setTeamInfo(formData);

    // Check if there's a need to set the current step
    if (setCurrentStep) {
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
      <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
          <FormLabel>
            Which category will this team compete in?
          </FormLabel>
          <Button
            type="button"
            className={
              formData.division.includes(1) ? 'brightness-50' : ''
            }
            bg="bama_gray"
            color="black"
            width="full"
            onClick={() => toggleDivision(1)}
          >
            Division 1
          </Button>
          <Button
            type="button"
            className={
              formData.division.includes(2) ? 'brightness-50' : ''
            }
            bg="bama_gray"
            color="black"
            width="full"
            onClick={() => toggleDivision(2)}
          >
            Division 2
          </Button>

          <hr />

          <FormLabel>How will this team participate?</FormLabel>
          <Button
            type="button"
            className={!formData.is_virtual ? 'brightness-50' : ''}
            bg="bama_gray"
            color="black"
            width="full"
            onClick={() =>
              setFormData({ ...formData, is_virtual: false })
            }
          >
            In-Person
          </Button>
          <Button
            type="button"
            className={formData.is_virtual ? 'brightness-50' : ''}
            bg="bama_gray"
            color="black"
            width="full"
            onClick={() =>
              setFormData({ ...formData, is_virtual: true })
            }
          >
            Virtual
          </Button>

          <Box>
            {formData.team_members.map((team_member, i) => (
              <div key={i}>
                <hr />
                <Stack spacing={1}>
                  <FormLabel>Student {i + 1}</FormLabel>
                  <FormControl isRequired>
                    <Grid templateColumns="repeat(2, 1fr)">
                      <GridItem>
                        <FormLabel>First name</FormLabel>
                      </GridItem>
                      <GridItem>
                        <Input
                          type="text"
                          id="first_name"
                          value={team_member.first_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              team_members: [
                                ...formData.team_members.slice(0, i),
                                {
                                  ...formData.team_members[i],
                                  first_name: e.target.value,
                                },
                                ...formData.team_members.slice(i + 1),
                              ],
                            })
                          }
                        />
                      </GridItem>
                    </Grid>
                  </FormControl>
                  <FormControl isRequired>
                    <Grid templateColumns="repeat(2, 1fr)">
                      <GridItem>
                        <FormLabel>Last name</FormLabel>
                      </GridItem>
                      <GridItem>
                        <Input
                          type="text"
                          id="last_name"
                          value={team_member.last_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              team_members: [
                                ...formData.team_members.slice(0, i),
                                {
                                  ...formData.team_members[i],
                                  last_name: e.target.value,
                                },
                                ...formData.team_members.slice(i + 1),
                              ],
                            })
                          }
                        />
                      </GridItem>
                    </Grid>
                  </FormControl>
                  <FormControl>
                    <Grid templateColumns="repeat(2, 1fr)">
                      <GridItem>
                        <FormLabel>Email</FormLabel>
                      </GridItem>
                      <GridItem>
                        <Input
                          type="email"
                          id="email"
                          value={team_member.email}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              team_members: [
                                ...formData.team_members.slice(0, i),
                                {
                                  ...formData.team_members[i],
                                  email: e.target.value,
                                },
                                ...formData.team_members.slice(i + 1),
                              ],
                            });
                          }}
                        />
                      </GridItem>
                    </Grid>
                  </FormControl>
                  <FormControl isRequired>
                    <Grid templateColumns="repeat(2, 1fr)">
                      <GridItem>
                        <FormLabel>Shirt size</FormLabel>
                      </GridItem>
                      <GridItem>
                        <Input
                          type="text"
                          value={team_member.shirt_size}
                          id="shirt_size"
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              team_members: [
                                ...formData.team_members.slice(0, i),
                                {
                                  ...formData.team_members[i],
                                  shirt_size: e.target.value,
                                },
                                ...formData.team_members.slice(i + 1),
                              ],
                            });
                          }}
                        />
                      </GridItem>
                    </Grid>
                  </FormControl>
                </Stack>
                {formData.team_members.length > 1 && (
                  <Button
                    className="mt-1 mb-1"
                    type="button"
                    colorScheme="red"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        team_members: [
                          ...formData.team_members.slice(0, i),
                          ...formData.team_members.slice(i + 1),
                        ],
                      })
                    }
                  >
                    Remove Student
                  </Button>
                )}
              </div>
            ))}

            {formData.team_members.length < 4 && (
              <Button
                className="float-end mt-1"
                bg="bama_gray"
                onClick={() => {
                  setFormData({
                    ...formData,
                    team_members: [
                      ...formData.team_members,
                      {
                        first_name: '',
                        last_name: '',
                        email: '',
                        shirt_size: '',
                      },
                    ],
                  });
                }}
              >
                Add Student
              </Button>
            )}
          </Box>

          <hr />

          <Box
            width="full"
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <Button type="submit" colorScheme="blue" width={40}>
              Add This Team
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
