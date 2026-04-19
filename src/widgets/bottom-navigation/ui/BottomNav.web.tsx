import { NavLink } from 'react-router-dom'

import PawIcon from '@/shared/assets/icons/paw-feed-icon.svg?react'
import SearchIcon from '@/shared/assets/icons/search-icon.svg?react'
import ChatIcon from '@/shared/assets/icons/chat-icon.svg?react'
import ProfileIcon from '@/shared/assets/icons/profile-icon.svg?react'

export const BottomNav = () => {
    const base = "flex flex-col items-center text-xs transition"
    const active = "text-[#C65D6D]"
    const inactive = "text-gray-400"

    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md px-6 py-3 flex justify-between">

                <NavLink
                    to="/feed"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : inactive}`
                    }
                >
                    <PawIcon className="w-6 h-6 mb-1" />
                    Главная
                </NavLink>

                <NavLink
                    to="/explore"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : inactive}`
                    }
                >
                    <SearchIcon className="w-6 h-6 mb-1" />
                    Поиск
                </NavLink>

                <NavLink
                    to="/chats"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : inactive}`
                    }
                >
                    <ChatIcon className="w-6 h-6 mb-1" />
                    Чаты
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `${base} ${isActive ? active : inactive}`
                    }
                >
                    <ProfileIcon className="w-6 h-6 mb-1" />
                    Профиль
                </NavLink>

            </div>

        </div>
    )
}