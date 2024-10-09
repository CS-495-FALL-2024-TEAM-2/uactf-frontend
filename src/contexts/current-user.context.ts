import { createContext } from 'react';


export type CurrentUserContextObjectType = {
    userRole: string,
    userId: string
};

export type CurrentUserContextType = {
    currentUser: CurrentUserContextObjectType | null,
    setCurrentUser: (currentUser: CurrentUserContextObjectType | null) => void
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: null,
    setCurrentUser: () => {}
});