import { Routes, Route } from 'react-router-dom'

import { FeedPage } from '@/pages/feed'
import { ExplorePage } from '@/pages/explore'
import { ChatsPage } from '@/pages/chats'
import { ProfilePage } from '@/pages/profile'

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<FeedPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    )
}