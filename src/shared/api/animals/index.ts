import { apiFetch } from '../base'

export const fetchAnimals = async () => {
    return apiFetch('/animals/swipe/')
}