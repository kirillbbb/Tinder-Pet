import { users } from '@/../mocks-data/users'

export const Header = ({ title }: { title?: string }) => {
    const currentUser = users[0]

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
            <img
                src={currentUser.avatar}
                className="w-9 h-9 rounded-full object-cover"
            />

        </header>
    )
}