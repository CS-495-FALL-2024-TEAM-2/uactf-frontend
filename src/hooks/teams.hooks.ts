import { AddTeamFormData } from "@/types/forms.types";
import { TeamWithStudents, UpdateTeamRequest } from "@/types/teams.types"
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";

export const useGetTeams = (teacher_id?: string) : {
  isPending: boolean,
  error: Error | null,
  data: {
    teams: TeamWithStudents[]
  },
  refetch: () => void
} => {
  const endpoint = `${BASE_API_URI}/teams/get?teacher_id=${teacher_id || ''}`;

  // query
  const { isPending, error, data, refetch} = useQuery({
    queryKey: ['teams', 'teacher', teacher_id],
    queryFn: async () => {
      const response = await fetch(endpoint, {credentials: 'include',});
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json();
    },

  });

  return {isPending, error, data, refetch};
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

export const useUpdateTeam = (
  team_id: string,
  onSuccessFn?: ((data: any, variables: UpdateTeamRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
  onErrorFn?: ((error: Error, variables: UpdateTeamRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
) : {
  mutate: UseMutateFunction<any, Error, UpdateTeamRequest, unknown>,
  isPending: boolean;
} => {
  const updateTeam = async (request_body: UpdateTeamRequest) => {
    const response = await fetch(
      `${BASE_API_URI}/teams/update/${team_id}`,
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
      throw new Error('Error updating team. Please try again');
    }

    return await response.json();
  }

  const createTeamMutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  return {mutate: createTeamMutation.mutate, isPending: createTeamMutation.isPending};
}

export const useGetTeamDetails = (team_id: string, enabled: boolean = true) : {
  isPending: boolean,
  error: Error | null,
  data: {
    team: TeamWithStudents
  }
} => {
  const endpoint = `${BASE_API_URI}/teams/details?team_id=${team_id}`;

  // query
  const { isPending, error, data} = useQuery({
    queryKey: ['team', team_id],
    queryFn: async () => {
      const response = await fetch(endpoint, {credentials: 'include',});
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json();
    },
    enabled: enabled,
  });

  return {isPending, error, data};
}

export const useDeleteTeam = (
  onSuccessFn?: ((data: any, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined,
  onErrorFn?: ((error: Error, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined,
) : {
  mutate: UseMutateFunction<any, Error, string, unknown>,
  isPending: boolean;
} => {
  const deleteTeam = async (team_id: string) => {
    const response = await fetch(
      `${BASE_API_URI}/teams/delete/${team_id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Error deleting team. Please try again');
    }

    return await response.json();
  }

  const deleteTeamMutation = useMutation({
    mutationFn: deleteTeam,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  return {mutate: deleteTeamMutation.mutate, isPending: deleteTeamMutation.isPending};
}
