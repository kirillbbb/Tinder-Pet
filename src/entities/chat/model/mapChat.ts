export const mapChat = (api: any, currentUserId: number) => {
    // 👉 находим "другого" пользователя
    const otherUser = api.users?.find(
        (u: any) => u.id !== currentUserId
    )

    return {
        id: api.id,

        // имя
        name: otherUser?.username || 'Чат',

        // аватар (если нет — null)
        avatar: otherUser?.avatar || null,

        // пока нет последнего сообщения (потом добавим)
        lastMessage: '',

        time: '',
        unread: 0,

        online: false,
    }
}