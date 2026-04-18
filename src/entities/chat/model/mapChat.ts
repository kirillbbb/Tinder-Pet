import { users } from '@/../mocks-data/users'
import { events } from '@/../mocks-data/events'

export const mapChat = (chat: any, currentUserId = 1) => {
    const lastMessage = chat.messages.at(-1)

    // 🔥 ЧАТ СОБЫТИЯ
    if (chat.type === 'event') {
        const event = events.find(e => e.id === chat.eventId)

        return {
            id: chat.id,
            name: event?.title || 'Событие',
            avatar: event?.image || '',
            lastMessage: lastMessage?.text || '',
            time: lastMessage?.time || '',
            unread: 1,
            online: false,
        }
    }

    // 🔥 ОБЫЧНЫЙ ЧАТ
    const otherUserId = chat.users.find((id: number) => id !== currentUserId)
    const user = users.find(u => u.id === otherUserId)

    return {
        id: chat.id,
        name: user?.name || 'Unknown',
        avatar: user?.avatar || '',
        lastMessage: lastMessage?.text || '',
        time: lastMessage?.time || '',
        unread: 1,
        online: true,
    }
}