import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from '@/shared/model/store'

import { FeedPage } from '@/pages/feed'
import { ExplorePage } from '@/pages/explore'
import { ChatsPage } from '@/pages/chats'
import { ProfilePage } from '@/pages/profile'
import { ChatPage } from '@/pages/chats/ui/ChatPage.web'
import { LoginPage } from '@/pages/login'

export const AppRouter = () => {
    const user = useAppStore(state => state.user)
    const isAuthChecked = useAppStore(state => state.isAuthChecked)

    const isAuth = !!user

    if (!isAuthChecked) {
        return <div>Loading...</div>
    }

    return (
        <Routes>
            <Route
                path="/login"
                element={!isAuth ? <LoginPage /> : <Navigate to="/feed" />}
            />

            {isAuth ? (
                <>
                    <Route path="/" element={<FeedPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/chats" element={<ChatsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* обычный чат */}
                    <Route path="/chat/:id" element={<ChatPage />} />

                    {/* 🔥 ВАЖНО: event чат */}
                    <Route path="/event-chat/:id" element={<ChatPage />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/login" />} />
            )}
        </Routes>
    )
}