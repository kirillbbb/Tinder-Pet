import type { Animal } from './types'
import type { AnimalApi } from '@/shared/api/animals/types'

const BASE_URL = 'http://127.0.0.1:8000'

export const mapAnimal = (api: AnimalApi): Animal => {
    let image: string | null = null

    // 🔥 новый вариант (prod)
    if (api.photo_url) {
        image = api.photo_url
    }

    // 🔥 старый вариант (local)
    else if (api.photo) {
        image = api.photo.startsWith('http')
            ? api.photo
            : `${BASE_URL}${api.photo}`
    }

    return {
        id: api.id,
        ownerId: api.owner,
        name: api.name,
        age: api.years_of_age,
        image,
        description: api.description,
        tags: api.characteristics?.map(c => c.character) || [],
    }
}