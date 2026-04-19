import type { MessageApi } from '@/shared/api/messages/types'

export const mapMessage = (msg: MessageApi) => ({
    id: msg.id,
    text: msg.text,
    time: msg.created_at,
    senderId: msg.sender,
    senderName: msg.sender_detail?.username || 'User',
})