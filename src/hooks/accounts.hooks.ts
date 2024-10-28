import { LoginRequest } from "@/types/accounts.types";
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation } from "@tanstack/react-query";

export const useLogin = (
    onSuccessFn?: ((data: any, variables: LoginRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: LoginRequest, context: unknown) => Promise<unknown> | unknown) | undefined
) : {
    isPending: boolean
    mutate: UseMutateFunction<any, Error, LoginRequest, unknown>
} => {
    const login = async (request_body: LoginRequest) => {
        const response = await fetch(
            `${BASE_API_URI}/auth/login`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request_body),
            }
        );

        if (!response.ok) {
            throw new Error('Error logging in. Please try again');
        }

        return await response.json();
    };

    // mutation
    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: loginMutation.mutate, isPending: loginMutation.isPending};
};