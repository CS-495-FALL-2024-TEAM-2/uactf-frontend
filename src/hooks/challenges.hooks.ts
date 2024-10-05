import { Challenges, CreateChallengeRequest } from "@/types/challenges.types";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";
import { BASE_API_URI } from "@/utils/constants";




export const useCreateChallenge = (
    onSuccessFn?: ((data: any, variables: CreateChallengeRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: CreateChallengeRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, CreateChallengeRequest, unknown>,
    isPending: boolean;
} => {
    const createChallenge = async (request_body: CreateChallengeRequest) => {
        const response = await fetch(
            `${BASE_API_URI}/challenges/create`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request_body),
            }
        );

        if (!response.ok) {
            throw new Error('Error creating challenge. Please try again');
        }

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

export const useGetChallenges = (year?: number) : {
    isPending: boolean,
    error: Error | null,
    data: {
        challenges: Challenges[]
    }
} => {
    const endpoint = year ? `${BASE_API_URI}/challenges/get?year=${year}` : `${BASE_API_URI}/challenges/get`;

    // query
    const { isPending, error, data} = useQuery({
        queryKey: year ? ['challenges', year] : ['challenges'],
        queryFn: async () => {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }
    });

    return {isPending, error, data};
}

export const useGetChallengeDetails = (challenge_id: string) : {
    isPending: boolean,
    error: Error | null,
    data: {
        challenge: Challenges
    }
} => {
    const endpoint = `${BASE_API_URI}/challenges/details?challenge_id=${challenge_id}`

    // query
    const { isPending, error, data} = useQuery({
        queryKey: ['challenge', challenge_id],
        queryFn: async () => {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }
    });

    return {isPending, error, data};
}