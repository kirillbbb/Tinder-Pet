import { API_URL, fetchJSON } from '@/shared/api/client'

export interface AnimalApi {
    id: number
    owner: number
    name: string
    years_of_age: number
    description: string
    photo: string | null
    characteristics: {
        id: number
        character: string
    }[]
}

export const getAnimals = () => {
    return fetchJSON<AnimalApi[]>(`${API_URL}/animals/swipe/`)
}