export interface Animal {
    id: number
    ownerId: number
    name: string
    age: number
    image: string | null
    description: string
    tags: string[]
}