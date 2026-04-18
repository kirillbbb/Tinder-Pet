import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'

import { chats } from '@/../mocks-data/chats'
import { mapChat } from '@/entities/chat/model/mapChat'
import { ChatItem } from '@/entities/chat/ui/ChatItem'
import { ChatStories } from '@/entities/chat/ui/ChatStories'

export const ChatsPage = () => {
    return (
        <div className="h-screen flex flex-col">

            <Header title="Сообщения" />

            <main className="flex-1 px-4 py-4 flex flex-col gap-4 max-w-lg mx-auto w-full overflow-y-auto">

                {/* сторис */}
                <ChatStories />

                {/* список чатов */}
                <div className="flex flex-col gap-3">
                    {chats.map(chat => (
                        <ChatItem key={chat.id} chat={mapChat(chat)} />
                    ))}
                </div>

            </main>

            <BottomNav />

        </div>
    )
}