export interface MessageApi {
    id: number
    chat: number
    sender: number
    sender_detail: {
        username: string
    }
    text: string
    created_at: string
}

export interface ChatApi {
    id: number
    users: {
        id: number
        username: string
        avatar?: string
    }[]
}