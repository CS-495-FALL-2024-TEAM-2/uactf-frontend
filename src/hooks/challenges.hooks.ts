import { Challenges, CreateChallengeRequest, UpdateChallengeRequest } from "@/types/challenges.types";
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
        const formData = new FormData();
        if (request_body.challenge_file_attachment){
            formData.append("challenge_file_attachment", request_body.challenge_file_attachment);
        }

        formData.append("challenge", JSON.stringify(request_body));

        const response = await fetch(
            `${BASE_API_URI}/challenges/create`, 
            {
                method: 'POST',
                body: formData,
                credentials: 'include',
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
            const response = await fetch(endpoint, {credentials: 'include',});
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        }
    });

    return {isPending, error, data};
}

export const useGetChallengeDetails = (challenge_id: string, enabled: boolean = true) : {
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
            const response = await fetch(endpoint, {credentials: 'include',});
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        },
        enabled: enabled
    });

    return {isPending, error, data};
}

export const useDeleteChallenge = (
    onSuccessFn?: ((data: any, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, string, unknown>,
    isPending: boolean;
} => {
    const deleteChallenge = async (challenge_id: string) => {
        const response = await fetch(
            `${BASE_API_URI}/challenges/${challenge_id}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Error deleting challenge. Please try again');
        }

        return await response.json();
    };

    // mutation
    const deleteChallengeMutation = useMutation({
        mutationFn: deleteChallenge,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: deleteChallengeMutation.mutate, isPending: deleteChallengeMutation.isPending};
}

// TODO: update api endpoint
export const useUpdateChallenge = (
    onSuccessFn?: ((data: any, variables: UpdateChallengeRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: UpdateChallengeRequest, context: unknown) => Promise<unknown> | unknown) | undefined
): {
    mutate: UseMutateFunction<any, Error, UpdateChallengeRequest, unknown>,
    isPending: boolean;
} => {
    const updateChallenge = async ({challenge_id, request_body, is_challenge_file_changed}: UpdateChallengeRequest) => {
        const formData = new FormData();
        formData.append("delete_old_challenge_file", is_challenge_file_changed ? "true" : "false");
        if (request_body.challenge_file_attachment){
            formData.append("challenge_file_attachment", request_body.challenge_file_attachment);
        }

        formData.append("challenge", JSON.stringify(request_body));
            
        const response = await fetch(
            `${BASE_API_URI}/challenges/${challenge_id}`, 
            {
                method: 'PUT',
                body: formData,
                credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Error updating challenge. Please try again');
        }

        return await response.json();
    };

    // mutation
    const updateChallengeMutation = useMutation({
        mutationFn: updateChallenge,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: updateChallengeMutation.mutate, isPending: updateChallengeMutation.isPending};
}