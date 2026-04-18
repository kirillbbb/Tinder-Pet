import type { AnimalApi } from '@/shared/api/animals'
import type { Animal } from './types'

export const mapAnimal = (api: AnimalApi): Animal => {
    return {
        id: api.id,
        name: api.name,
        age: api.years_of_age,
        image: api.photo || 'https://via.placeholder.com/400x500',
        tags: api.characteristics.map(c => c.character),
    }
}