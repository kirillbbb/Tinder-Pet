import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'
import { useAppStore } from '@/shared/model/store'

export const ChatsPage = () => {
    const navigate = useNavigate()

    const { chats, fetchChats } = useAppStore()

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div className="h-screen flex flex-col">

            <Header title="Чаты" />

            <main className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">

                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => navigate(`/chat/${chat.id}`)}
                        className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-3 cursor-pointer active:scale-95 transition"
                    >
                        {chat.avatar ? (
                            <img
                                src={chat.avatar}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                👤
                            </div>
                        )}

                        <div className="flex flex-col">
                            <span className="font-medium">
                                {chat.name}
                            </span>

                            {chat.lastMessage && (
                                <span className="text-xs text-gray-500">
                                    {chat.lastMessage}
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {chats.length === 0 && (
                    <span className="text-gray-400 text-center">
                        Нет чатов
                    </span>
                )}

            </main>

            <BottomNav />

        </div>
    )
}