import { apiFetch } from '../base'

export const fetchChats = () => {
    return apiFetch('/chats/')
}