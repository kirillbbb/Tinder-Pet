import { useAppStore } from '@/shared/model/store'

export const Header = ({ title }: { title?: string }) => {
    const user = useAppStore(state => state.user)

    return (
        <header className="w-full flex items-center justify-between px-4 py-3 bg-white">

            {/* 🔍 слева */}
            <button className="text-xl">
                🔍
            </button>

            {/* 🧠 центр */}
            <span className="font-semibold text-[#C65D6D]">
                {title || 'Tinder Pet'}
            </span>

            {/* 👤 справа */}
            {user?.avatar ? (
                <img
                    src={user.avatar}
                    className="w-9 h-9 rounded-full object-cover"
                />
            ) : (
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-500">
                    {user?.name?.[0] || '?'}
                </div>
            )}

        </header>
    )
}