import { apiFetch } from '../base'

export const fetchMessages = (chatId: number) => {
    return apiFetch(`/chats/${chatId}/messages/`)
}

export const sendMessage = (chatId: number, text: string) => {
    return apiFetch(`/chats/${chatId}/messages/`, {
        method: 'POST',
        body: JSON.stringify({ text }),
    })
}

export const fetchChats = () => {
    return apiFetch('/chats/')
}