import { AddTeamFormData } from "@/types/forms.types";
import { TeamWithStudents } from "@/types/teams.types"
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";

export const useGetTeams = (teacher_id?: string) : {
  isPending: boolean,
  error: Error | null,
  data: {
    teams: TeamWithStudents[]
  }
} => {
  const endpoint = `${BASE_API_URI}/teams/get?teacher_id=${teacher_id || ''}`;

  // query
  const { isPending, error, data} = useQuery({
    queryKey: ['teams', 'teacher', teacher_id],
    queryFn: async () => {
      const response = await fetch(endpoint, {credentials: 'include',});
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json();
    }
  });

  return {isPending, error, data};
}

export const useCreateTeam = (
  onSuccessFn?: ((data: any, variables: AddTeamFormData, context: unknown) => Promise<unknown> | unknown) | undefined,
  onErrorFn?: ((error: Error, variables: AddTeamFormData, context: unknown) => Promise<unknown> | unknown) | undefined,
) : {
  mutate: UseMutateFunction<any, Error, AddTeamFormData, unknown>,
  isPending: boolean;
} => {
  const createTeam = async (request_body: AddTeamFormData) => {
    const response = await fetch(
      `${BASE_API_URI}/teams/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(request_body),
      }
    );

    if (!response.ok) {
      throw new Error('Error creating team. Please try again');
    }

    return await response.json();
  }

  const createTeamMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  return {mutate: createTeamMutation.mutate, isPending: createTeamMutation.isPending};
}
