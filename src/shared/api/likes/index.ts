import { apiFetch } from '../base'

export const likeAnimalApi = (animalId: number) => {
    return apiFetch('/like/', {
        method: 'POST',
        body: JSON.stringify({ animal: animalId }),
    })
}