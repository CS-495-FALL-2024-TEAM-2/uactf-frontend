import { TeacherInfo } from "@/types/userInfo.types"
import { BASE_API_URI } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachers = () : {
  isPending: boolean,
  error: Error | null,
  data: {
    teachers: TeacherInfo[]
  }
} => {
  const endpoint = `${BASE_API_URI}/teachers/get/all`;

  // query
  const { isPending, error, data} = useQuery({
    queryKey: ['teachers'],
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
