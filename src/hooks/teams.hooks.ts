import { TeamWithMembers } from "@/types/teams.types"
import { BASE_API_URI } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetTeams = (teacher_id?: string) : {
  isPending: boolean,
  error: Error | null,
  data: {
    teams: TeamWithMembers[]
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
