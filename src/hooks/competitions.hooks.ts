import { CreateCompetitionRequest } from "@/types/competitions.types";
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";

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