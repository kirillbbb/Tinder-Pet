import { apiFetch } from './base'

export const fetchEvents = () => {
    return apiFetch('/events/')
}

export const fetchEventById = (id: number) => {
    return apiFetch(`/events/${id}/`)
}

export const participateEvent = (eventId: number) => {
    return apiFetch(`/events/${eventId}/participate/`, {
        method: 'POST',
    })
}

export const createEvent = (data: any) => {
    return apiFetch('/events/', {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export const fetchTags = () => {
    return apiFetch('/tags/')
}