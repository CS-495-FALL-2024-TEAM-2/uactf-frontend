import { Competition, CreateCompetitionRequest } from "@/types/competitions.types"
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

export const useCreateCompetition = (
    onSuccessFn?: ((data: any, variables: CreateCompetitionRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: CreateCompetitionRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, CreateCompetitionRequest, unknown>,
    isPending: boolean;
} => {

    const createCompetition = async (request_body: CreateCompetitionRequest) => {
        const response = await fetch(
            `${BASE_API_URI}/competitions/create`,
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
