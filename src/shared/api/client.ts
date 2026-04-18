import { getToken } from '@/shared/lib/token'

export const API_URL = 'http://127.0.0.1:8000/api'

export const fetchJSON = async <T>(url: string): Promise<T> => {
    const token = getToken()

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
        },
    })

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
    }

    return res.json()
}