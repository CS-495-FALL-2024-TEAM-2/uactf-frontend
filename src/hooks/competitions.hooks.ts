import { Competition, CreateCompetitionRequest, UpdateCompetitionRequest } from "@/types/competitions.types"
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";

export const useGetCompetitions = (isCurrent?: boolean) : {
    isPending: boolean,
    error: Error | null,
    data: {
        competitions: Competition[]
    }
} => {
    const endpoint = isCurrent === true ? `${BASE_API_URI}/competitions/get/current` : `${BASE_API_URI}/competitions/get`;

    // query
    const { isPending, error, data} = useQuery({
    queryKey: isCurrent === true ? ['competitions', 'current'] : ['competitions'],
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


export const useGetCompetition = (competition_id: string) : {
    isPending: boolean,
    error: Error | null,
    data: {
        competition: Competition
    }
} => {
    const endpoint = `${BASE_API_URI}/competitions/details?competition_id=${competition_id}`;

    // query
    const { isPending, error, data} = useQuery({
        queryKey:['competitions', competition_id],
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


export const useCreateCompetition = (
    onSuccessFn?: ((data: any, variables: CreateCompetitionRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: CreateCompetitionRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, CreateCompetitionRequest, unknown>,
    isPending: boolean;
} => {
    const createCompetition = async (request_body: CreateCompetitionRequest) => {

        const formData = new FormData();
        if (request_body.liability_release_form_file){
            formData.append("liability_release_form_file", request_body.liability_release_form_file);
        }

        formData.append("competition", JSON.stringify(request_body));

        const response = await fetch(
            `${BASE_API_URI}/competitions/create`,
            {
                method: 'POST',
                credentials: 'include',
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error('Error creating competition. Please try again');
        }

        return await response.json();
    };

    // mutation
    const createCompetitionMutation = useMutation({
        mutationFn: createCompetition,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: createCompetitionMutation.mutate, isPending: createCompetitionMutation.isPending};

}

export const useUpdateCompetition = (
    onSuccessFn?: ((data: any, variables: UpdateCompetitionRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: UpdateCompetitionRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, UpdateCompetitionRequest, unknown>,
    isPending: boolean;
} => {
    const updateCompetition = async ({request_body, competition_id, is_liability_release_form_changed}: UpdateCompetitionRequest) => {
        const formData = new FormData();
        formData.append("delete_old_liability_release_form", is_liability_release_form_changed ? "true" : "false");
        if (request_body.liability_release_form_file){
            formData.append("liability_release_form_file", request_body.liability_release_form_file);
        }

        formData.append("competition", JSON.stringify(request_body));

        const response = await fetch(
            `${BASE_API_URI}/competitions/${competition_id}`,
            {
                method: 'PUT',
                credentials: 'include',
                body: formData,
            }
        );

        const json = await response.json();

        if (!response.ok) {
            throw new Error(json.error);
        }

        return json;
    };

    // mutation
    const updateCompetitionMutation = useMutation({
        mutationFn: updateCompetition,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: updateCompetitionMutation.mutate, isPending: updateCompetitionMutation.isPending};

}
