export interface AnimalApi {
    id: number
    owner: number
    name: string
    years_of_age: number
    description: string

    // 🔥 оба варианта
    photo?: string | null
    photo_url?: string | null

    characteristics: { character: string }[]
}