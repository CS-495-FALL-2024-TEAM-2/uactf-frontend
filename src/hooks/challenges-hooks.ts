import { CreateChallengeRequest } from "@/types/challenges.types";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";



export const useCreateChallenge = (
    onSuccessFn?: ((data: any, variables: CreateChallengeRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: CreateChallengeRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, CreateChallengeRequest, unknown>,
    isPending: boolean;
} => {
    const createChallenge = async (request_body: CreateChallengeRequest) => {
        console.log(JSON.stringify(request_body))
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/challenges/create`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request_body),
            }
        );

        return await response.json();
    };

    // mutation
    const createChallengeMutation = useMutation({
        mutationFn: createChallenge,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: createChallengeMutation.mutate, isPending: createChallengeMutation.isPending};
}