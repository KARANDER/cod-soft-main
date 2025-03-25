const BASE_URL = process.env.BASE_URL

// auth endpoints

export const endpoints = {
    SIGNUP_API: `${BASE_URL}/register`,
    login: `${BASE_URL}/auth/login`,
}