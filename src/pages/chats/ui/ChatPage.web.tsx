import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom'

import { useAppStore } from '@/shared/model/store'
import { Header } from '@/shared/ui'

import {
    fetchEventMessages,
    sendEventMessage
} from '@/shared/api/eventChat'

export const ChatPage = () => {
    const { id } = useParams()
    const location = useLocation()

    const chatId = Number(id)

    const { messages, fetchMessages, sendMessage, user } = useAppStore()

    const [text, setText] = useState('')
    const bottomRef = useRef<HTMLDivElement | null>(null)

    // 🔥 правильное определение типа
    const isEventChat = location.pathname.includes('event-chat')

    useEffect(() => {
        if (!chatId) return

        const loadMessages = async () => {
            if (isEventChat) {
                const data = await fetchEventMessages(chatId)

                useAppStore.setState({
                    messages: data.map((m: any) => ({
                        id: m.id,
                        text: m.text,
                        senderId: m.sender,
                        senderName: m.sender_detail.username,
                    }))
                })
            } else {
                await fetchMessages(chatId)
            }
        }

        loadMessages()
    }, [chatId, isEventChat])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        if (!text.trim()) return

        if (isEventChat) {
            await sendEventMessage(chatId, text)

            const data = await fetchEventMessages(chatId)

            useAppStore.setState({
                messages: data.map((m: any) => ({
                    id: m.id,
                    text: m.text,
                    senderId: m.sender,
                    senderName: m.sender_detail.username,
                }))
            })
        } else {
            await sendMessage(chatId, text)
            await fetchMessages(chatId)
        }

        setText('')
    }

    return (
        <div className="h-screen flex flex-col">

            <Header title={isEventChat ? 'Чат мероприятия' : `Чат #${chatId}`} />

            {/* сообщения */}
            <main className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto bg-gray-100 pb-28">

                {messages.map(msg => {
                    const isMe = msg.senderId === user?.id

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                                    px-4 py-2 rounded-2xl max-w-[75%] text-sm
                                    ${isMe
                                    ? 'bg-[#C65D6D] text-white rounded-br-sm'
                                    : 'bg-white shadow-sm rounded-bl-sm'
                                }
                                `}
                            >
                                {!isMe && (
                                    <div className="text-xs text-gray-400 mb-1">
                                        {msg.senderName}
                                    </div>
                                )}

                                <div>{msg.text}</div>
                            </div>
                        </div>
                    )
                })}

                <div ref={bottomRef} />

            </main>

            {/* input */}
            <div className="p-3 border-t flex gap-2 bg-white pb-24">

                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Сообщение..."
                    className="flex-1 border rounded-full px-4 py-2 outline-none"
                />

                <button
                    onClick={handleSend}
                    className="bg-[#C65D6D] text-white px-4 rounded-full"
                >
                    →
                </button>

            </div>

        </div>
    )
}