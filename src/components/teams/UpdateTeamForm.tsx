'use client';

import { useGetTeamDetails } from '@/hooks/teams.hooks';
import { UpdateTeamRequest } from '@/types/teams.types';
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
  useToast,
} from '@chakra-ui/react';
import React from 'react';

export default function UpdateTeamForm({
  setTeamInfo,
  isPending,
  isUpdateTeam,
  teamId,
}: {
  setTeamInfo: React.Dispatch<
    React.SetStateAction<UpdateTeamRequest | null>
  >;
  isPending?: boolean;
  isUpdateTeam?: boolean;
  teamId?: string;
}) {
  const [formData, setFormData] = React.useState<UpdateTeamRequest>({
    division: [2],
    is_virtual: true,
    name: '',
    team_members: [
      {
        id: '',
        first_name: '',
        last_name: '',
        shirt_size: 'Small',
      },
    ],
  });

  const toast = useToast();

  const {
    isPending: isFetchingDetails,
    error,
    data,
  } = useGetTeamDetails(teamId ?? '', teamId !== undefined);

  React.useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        position: 'top',
        description: 'Error fetching team details',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    if (data) {
      const team = data.team;
      setFormData({
        division: team.division,
        is_virtual: team.is_virtual,
        name: team.name,
        team_members: team.students.map((student) => ({
          id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          shirt_size: student.shirt_size,
        })),
      });
    }
  }, [data]);

  const toggleDivision = (division: number) => {
    if (formData.division.includes(division)) {
      if (formData.division.length === 1) {
        // At least one division must be selected
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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    // validate form
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setTeamInfo(formData);
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

          <hr />

          <FormControl isRequired>
            <FormLabel>Team Name</FormLabel>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormControl>

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
                        <Select
                          name="shirt_size"
                          id="shirt_size"
                          value={team_member.shirt_size}
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
                          required
                        >
                          <option value="Small">Small</option>
                          <option value="Medium">Medium</option>
                          <option value="Large">Large</option>
                          <option value="Extra large">
                            Extra Large
                          </option>
                        </Select>
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
                        id: '',
                        first_name: '',
                        last_name: '',
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
            <Button
              type="submit"
              colorScheme="blue"
              width={40}
              isLoading={isPending ? isPending : false}
            >
              {isUpdateTeam ? 'Update This Team' : 'Add This Team'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}