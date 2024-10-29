import { LoginRequest, LoginResponse, UserRole } from "@/types/accounts.types";
import { BASE_API_URI } from "@/utils/constants";
import { UseMutateFunction, useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = (
    onSuccessFn?: ((data: LoginResponse, variables: LoginRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
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



export const useGetUserRole = () : {
    isPending: boolean,
    error: Error | null,
    data: UserRole
} => {
    const endpoint = `${BASE_API_URI}/auth/role`

    // query
    const { isPending, error, data} = useQuery({
        queryKey: ['auth', 'role'],
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