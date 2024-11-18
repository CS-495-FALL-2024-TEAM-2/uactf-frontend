import { BASE_API_URI } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type CurrentUserContextObjectType = {
  userRole: string;
};

export type CurrentUserContextType = {
  currentUser: CurrentUserContextObjectType | null;
  setCurrentUser: (
    currentUser: CurrentUserContextObjectType | null
  ) => void;
};

export const CurrentUserContext = createContext<
  CurrentUserContextType
>({
  currentUser: null,
  setCurrentUser: () => {},
});

export function useGetCurrentUser() {
  const { currentUser } = useContext(CurrentUserContext);
  return currentUser;
}

export function CurrentUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    currentUser,
    setCurrentUser,
  ] = useState<CurrentUserContextObjectType | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const getUserRoles = async () => {
      try {
        const response = await fetch(`${BASE_API_URI}/auth/role`, {
          credentials: 'include',
        });

        if (!isMounted) return;

        if (!response.ok) {
          if (response.status === 401) {
            // refresh token
            const refreshResponse = await fetch(
              `${BASE_API_URI}/refresh`,
              {
                method: 'POST',
                credentials: 'include',
              }
            );
            if (!refreshResponse.ok) {
              router.replace('/login');
              return;
            }

            // try again
            const retryResponse = await fetch(
              `${BASE_API_URI}/auth/role`,
              {
                credentials: 'include',
              }
            );

            if (!retryResponse.ok) {
              router.replace('/login');
              return;
            }

            const retryData = await retryResponse.json();
            console.log('retryData', retryData);
            setCurrentUser({
              userRole: retryData.role,
            });
            return;
          }
        }

        const data = await response.json();
        setCurrentUser({
          userRole: data.role,
        });
      } catch (err) {
        router.replace('/login');
      }
    };

    getUserRoles();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
