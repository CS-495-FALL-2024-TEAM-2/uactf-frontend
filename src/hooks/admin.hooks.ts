import { StudentInfo } from "@/types/userInfo.types";
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";

export const useGetStudentsToBeVerified = () : {
    isPending: boolean,
    error: Error | null,
    data: {
        students: StudentInfo[]
    }
    refetchStudentsToBeVerified: () => void
} => {
    const endpoint = `${BASE_API_URI}/admin/get-students-to-be-verified`;

    // query
    const { isPending, error, data, refetch} = useQuery({
        queryKey: ['get-students-to-be-verified'],
        queryFn: async () => {
            const response = await fetch(endpoint, {credentials: 'include',});
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }
    });

    return {isPending, error, data, refetchStudentsToBeVerified: refetch};
}

export const useVerifyStudent = (
    onSuccessFn?: ((data: any, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined
  ) : {
    mutate: UseMutateFunction<any, Error, string, unknown>,
    isPending: boolean;
  } => {
    const verifyStudent = async (studentId: string) => {
      const response = await fetch(
        `${BASE_API_URI}/admin/verify-student/${studentId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
  
      if (!response.ok) {
        throw new Error('Error verifying student. Please try again');
      }
  
      return await response.json();
    };
  
    // mutation
    const verifyStudentMutation = useMutation({
      mutationFn: verifyStudent,
      onSuccess: onSuccessFn,
      onError: onErrorFn,
    });
  
    return {mutate: verifyStudentMutation.mutate, isPending: verifyStudentMutation.isPending};
  }