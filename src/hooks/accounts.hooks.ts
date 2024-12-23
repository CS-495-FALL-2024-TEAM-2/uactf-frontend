import { CreateCrimsonDefenseRequest, CreateTeacherRequest, LoginRequest } from '@/types/accounts.types';
import { BASE_API_URI } from '@/utils/constants';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

export const useCreateCDMember = (
  onSuccessFn?: ((data: any, variables: CreateCrimsonDefenseRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
  onErrorFn?: ((error: Error, variables: CreateCrimsonDefenseRequest, context: unknown) => Promise<unknown> | unknown) | undefined
) : {
  mutate: UseMutateFunction<any, Error, CreateCrimsonDefenseRequest, unknown>,
  isPending: boolean;
} => {
  const createCDMember = async (request_body: CreateCrimsonDefenseRequest) => {
    const response = await fetch(
      `${BASE_API_URI}/accounts/crimson_defense/create`,
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
      throw new Error('Error creating crimson defense member. Please try again');
    }

    return await response.json();
  };

  // mutation
  const createCDMemberMutation = useMutation({
    mutationFn: createCDMember,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  return {mutate: createCDMemberMutation.mutate, isPending: createCDMemberMutation.isPending};
}

export const useCreateTeacher = (
  onSuccessFn?: ((data: any, variables: CreateTeacherRequest, context: unknown) => Promise<unknown> | unknown) | undefined,
  onErrorFn?: ((error: Error, variables: CreateTeacherRequest, context: unknown) => Promise<unknown> | unknown) | undefined
) : {
  mutate: UseMutateFunction<any, Error, CreateTeacherRequest, unknown>,
  isPending: boolean;
} => {
  const createTeacher = async (request_body: CreateTeacherRequest) => {
    const response = await fetch(
      `${BASE_API_URI}/accounts/teachers/create`,
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
      throw new Error('Error creating teacher. Please try again');
    }

    return await response.json();
  };

  // mutation
  const createTeacherMutation = useMutation({
    mutationFn: createTeacher,
    onSuccess: onSuccessFn,
    onError: onErrorFn,
  });

  return {mutate: createTeacherMutation.mutate, isPending: createTeacherMutation.isPending};
}

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
                credentials: 'include',
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

export const useLogout = (
    onSuccessFn?: ((data: any, variables: void, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: void, context: unknown) => Promise<unknown> | unknown) | undefined
) : {
    isPending: boolean
    mutate: UseMutateFunction<any, Error, void, unknown>
} => {
    const logout = async () => {
        const response = await fetch(
            `${BASE_API_URI}/auth/logout`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );

        if (!response.ok) {
            throw new Error('Error logging out. Please try again');
        }

        return await response.json();
    };

    // mutation
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: logoutMutation.mutate, isPending: logoutMutation.isPending};
}

export const useForgotPassword = (
    onSuccessFn?: ((data: any, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined,
    onErrorFn?: ((error: Error, variables: string, context: unknown) => Promise<unknown> | unknown) | undefined
) : {
    isPending: boolean
    mutate: UseMutateFunction<any, Error, string, unknown>
} => {
    const forgotPassword = async (email_address: string) => {
        const response = await fetch(
            `${BASE_API_URI}/auth/forgot/password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    "email": email_address
                }),
            }
        );

        if (!response.ok) {
            throw new Error('Error sending new password. Please try again');
        }

        return await response.json();
    };

    // mutation
    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: onSuccessFn,
        onError: onErrorFn,
    });

    return {mutate: forgotPasswordMutation.mutate, isPending: forgotPasswordMutation.isPending};
};
