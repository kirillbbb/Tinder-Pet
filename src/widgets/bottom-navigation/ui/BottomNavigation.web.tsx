import { Link, useLocation } from 'react-router-dom'

const tabs = [
    { path: '/feed', label: '🔥' },
    { path: '/explore', label: '🔍' },
    { path: '/chats', label: '💬' },
    { path: '/profile', label: '👤' },
]

export const BottomNavigation = () => {
    const location = useLocation()

    return (
        <div className="bottom-nav">
            {tabs.map(tab => {
                const isActive = location.pathname === tab.path

                return (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        className={`bottom-nav__item ${
                            isActive ? 'bottom-nav__item--active' : ''
                        }`}
                    >
                        {tab.label}
                    </Link>
                )
            })}
        </div>
    )
}