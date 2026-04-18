import { Link, useLocation } from 'react-router-dom'

export const BottomNav = () => {
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-16 flex justify-around items-center">
            <Link to="/" className={isActive('/') ? 'text-primary' : 'text-gray-400'}>
                Главная
            </Link>

            <Link to="/explore" className={isActive('/explore') ? 'text-primary' : 'text-gray-400'}>
                Поиск
            </Link>

            <Link to="/chats" className={isActive('/chats') ? 'text-primary' : 'text-gray-400'}>
                Чаты
            </Link>

            <Link to="/profile" className={isActive('/profile') ? 'text-primary' : 'text-gray-400'}>
                Профиль
            </Link>
        </nav>
    )
}