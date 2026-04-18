import { useNavigate } from 'react-router-dom'

interface Props {
    chat: {
        id: number
        name: string
        lastMessage: string
        time: string
        unread: number
        online: boolean
        avatar: string
    }
}

export const ChatItem = ({ chat }: Props) => {
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm cursor-pointer active:scale-[0.98] transition"
        >

            {/* аватар */}
            <div className="relative">
                <img
                    src={chat.avatar}
                    className="w-14 h-14 rounded-full object-cover"
                />

                {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
            </div>

            {/* текст */}
            <div className="flex-1 flex flex-col">
                <span className="font-semibold">{chat.name}</span>
                <span className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                </span>
            </div>

            {/* справа */}
            <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400">{chat.time}</span>

                {chat.unread > 0 && (
                    <div className="bg-[#C65D6D] text-white text-xs px-2 py-0.5 rounded-full">
                        {chat.unread}
                    </div>
                )}
            </div>

        </div>
    )
}