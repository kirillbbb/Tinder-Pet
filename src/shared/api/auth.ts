const BASE_URL = 'http://127.0.0.1:8000/api'

export const login = async (username: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })

    const data = await res.json()

    console.log('LOGIN RESPONSE BODY:', data)

    if (!res.ok) {
        throw new Error('Login failed')
    }

    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)

    return data
}