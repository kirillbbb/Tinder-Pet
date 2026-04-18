import { useParams } from 'react-router-dom'
import { useState } from 'react'

import { chats } from '@/../mocks-data/chats'
import { users } from '@/../mocks-data/users'
import { events } from '@/../mocks-data/events'

export const ChatPage = () => {
    const { id } = useParams()
    const currentUserId = 1

    const chat = chats.find(c => c.id === Number(id))

    const [messages, setMessages] = useState(chat?.messages || [])
    const [text, setText] = useState('')

    if (!chat) return <div className="p-4">Чат не найден</div>

    let title = ''
    let avatar = ''

    // 🔥 EVENT CHAT
    if (chat.type === 'event') {
        const event = events.find(e => e.id === chat.eventId)

        title = event?.title || 'Событие'
        avatar = event?.image || ''
    } else {
        // 🔥 DIRECT CHAT
        const otherUserId = chat.users.find(u => u !== currentUserId)
        const user = users.find(u => u.id === otherUserId)

        title = user?.name || 'User'
        avatar = user?.avatar || ''
    }

    const sendMessage = () => {
        if (!text.trim()) return

        const newMsg = {
            id: Date.now(),
            senderId: currentUserId,
            text,
            time: 'now',
        }

        setMessages(prev => [...prev, newMsg])
        setText('')
    }

    return (
        <div className="h-screen flex flex-col">

            {/* 🔝 HEADER */}
            <div className="flex items-center gap-3 p-4 border-b bg-white">

                <img
                    src={avatar}
                    className="w-10 h-10 rounded-full object-cover"
                />

                <span className="font-semibold">
          {title}
        </span>

            </div>

            {/* 💬 MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">

                {messages.map(msg => {
                    const isMine = msg.senderId === currentUserId

                    return (
                        <div
                            key={msg.id}
                            className={`
                max-w-[70%] px-4 py-2 rounded-2xl text-sm
                ${isMine
                                ? 'self-end bg-[#C65D6D] text-white'
                                : 'self-start bg-gray-200'}
              `}
                        >
                            {msg.text}
                        </div>
                    )
                })}

            </div>

            {/* ✏️ INPUT */}
            <div className="p-3 border-t flex gap-2 bg-white">

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Сообщение..."
                    className="flex-1 bg-gray-100 px-4 py-2 rounded-full outline-none"
                />

                <button
                    onClick={sendMessage}
                    className="bg-[#C65D6D] text-white px-4 rounded-full"
                >
                    →
                </button>

            </div>

        </div>
    )
}