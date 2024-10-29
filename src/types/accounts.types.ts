export type LoginRequest = {
    email: string,
    password: string
};

export type LoginResponse = {
    access_token: string,
    message: string,
    refresh_token: string,
    role: string
};

export type UserRole = {
    role: string
}