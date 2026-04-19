export interface ChatApi {
    id: number
    users: {
        id: number
        username: string
        avatar?: string
    }[]
}