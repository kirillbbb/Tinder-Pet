import { apiFetch } from '../base'

export const fetchProfile = () => {
    return apiFetch('/profile/')
}

// 🔥 ДОБАВЬ ЭТО
export const updateProfile = (data: Partial<{
    username: string
    email: string
    bio: string
}>) => {
    return apiFetch('/profile/', {
        method: 'PATCH',
        body: JSON.stringify(data),
    })
}