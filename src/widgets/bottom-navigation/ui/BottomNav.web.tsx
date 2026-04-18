import { NavLink } from 'react-router-dom'

export const BottomNav = () => {
    return (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-md px-6 py-3 flex justify-between">

                <NavLink to="/feed" className="text-sm">
                    Главная
                </NavLink>

                <NavLink to="/explore" className="text-sm">
                    Поиск
                </NavLink>

                <NavLink to="/chats" className="text-sm">
                    Чаты
                </NavLink>

                <NavLink to="/profile" className="text-sm">
                    Профиль
                </NavLink>

            </div>

        </div>
    )
}