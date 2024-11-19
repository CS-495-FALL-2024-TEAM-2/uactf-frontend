import { UploadSignedLiabilityReleaseFormRequest } from "@/types/teams.types";
import { TeacherInfo } from "@/types/userInfo.types"
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";

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

export const useUploadSignedLiabilityForm = (
  onSuccessFn?: ((data: any, variables: UploadSignedLiabilityReleaseFormRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
  onErrorFn?: ((error: Error, variables: UploadSignedLiabilityReleaseFormRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
  mutate: UseMutateFunction<any, Error, UploadSignedLiabilityReleaseFormRequest, unknown>,
  isPending: boolean;
} => {
  const uploadSignedLiabilityForm = async ({student_id, signed_liability_release_form}: UploadSignedLiabilityReleaseFormRequest) => {
      const formData = new FormData();
      formData.append("signed_liability_release_form", signed_liability_release_form);
      formData.append("student_id", student_id);
          
      const response = await fetch(
          `${BASE_API_URI}/teachers/upload-signed-liability-release-form`, 
          {
              method: 'POST',
              body: formData,
              credentials: 'include',
          }
      );

      if (!response.ok) {
          throw new Error('Error uploading signed liability release form . Please try again');
      }

      return await response.json();
  };

  // mutation
  const uploadSignedLiabilityFormMutation = useMutation({
      mutationFn: uploadSignedLiabilityForm,
      onSuccess: onSuccessFn,
      onError: onErrorFn,
  });

  return {mutate: uploadSignedLiabilityFormMutation.mutate, isPending: uploadSignedLiabilityFormMutation.isPending};
}
