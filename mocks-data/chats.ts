export const chats = [
    {
        id: 1,
        type: 'direct',
        users: [1, 2],
        messages: [
            {
                id: 1,
                senderId: 2,
                text: 'Привет! Придешь на мероприятие?',
                time: '12:00',
            },
            {
                id: 2,
                senderId: 1,
                text: 'Да, звучит круто!',
                time: '12:05',
            },
        ],
    },

    {
        id: 2,
        type: 'event',
        eventId: 1,
        users: [1, 2],
        messages: [
            {
                id: 1,
                senderId: 2,
                text: 'Добро пожаловать на встречу!',
                time: '10:00',
            },
        ],
    },
]