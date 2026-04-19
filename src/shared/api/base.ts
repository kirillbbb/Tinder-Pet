const BASE_URL = 'http://127.0.0.1:8000/api'

export const apiFetch = async (url: string, options?: RequestInit) => {
    const token = localStorage.getItem('accessToken')

    const res = await fetch(`${BASE_URL}${url}`, {
        ...options,
        headers: {
            ...(options?.headers || {}),
            'Content-Type': 'application/json',
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
        },
    })

    if (!res.ok) {
        const error = await res.json()
        console.error('API ERROR BODY:', error)
        throw new Error('API error')
    }

    return res.json()
}