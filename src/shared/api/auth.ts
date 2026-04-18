import { API_URL } from './client'

export const login = async (username: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
        throw new Error('Login failed')
    }

    return res.json()
}