import { apiFetch } from '../base'

export const fetchEventMessages = (eventId: number) => {
    return apiFetch(`/events/${eventId}/chat/`)
}

export const sendEventMessage = (eventId: number, text: string) => {
    return apiFetch(`/events/${eventId}/chat/`, {
        method: 'POST',
        body: JSON.stringify({ text }),
    })
}