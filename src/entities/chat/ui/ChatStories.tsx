import { useNavigate } from 'react-router-dom'
import { chats } from '@/../mocks-data/chats'
import { mapChat } from '@/entities/chat/model/mapChat'

export const ChatStories = () => {
    const navigate = useNavigate()

    return (
        <div className="flex gap-3 overflow-x-auto pb-2">

            {chats.map(chat => {
                const mapped = mapChat(chat)

                return (
                    <div
                        key={chat.id}
                        onClick={() => navigate(`/chat/${chat.id}`)}
                        className="flex flex-col items-center gap-1 cursor-pointer"
                    >

                        <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 to-purple-500">
                            <img
                                src={mapped.avatar}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>

                        <span className="text-xs text-center">
                            {mapped.name}
                        </span>

                    </div>
                )
            })}

        </div>
    )
}