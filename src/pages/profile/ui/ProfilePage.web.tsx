import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'
import { users } from '@/../mocks-data/users'
import { events } from '@/../mocks-data/events'
import { chats } from '@/../mocks-data/chats'
import {animalMock} from '@/../mocks-data/animals'

import type { Animal } from '@/entities/animal'

export const ProfilePage = () => {
    const currentUser = users[0]

    // 🐶 животные пользователя
    const userAnimals = animalMock.filter(
        (a: Animal) => a.ownerId === currentUser.id
    )

    // 📅 события пользователя
    const userEvents = events.filter(
        e =>
            e.organizerId === currentUser.id ||
            e.participants?.includes(currentUser.id)
    )

    // 💬 чаты пользователя
    const userChats = chats.filter(c =>
        c.users.includes(currentUser.id)
    )

    return (
        <div className="h-screen flex flex-col">

            <Header title="Профиль" />

            <main className="flex-1 px-4 py-4 flex flex-col gap-6 max-w-lg mx-auto w-full overflow-y-auto">

                {/* 👤 пользователь */}
                <div className="bg-white rounded-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-4 flex flex-col items-center text-center">

                    <img
                        src={currentUser.avatar}
                        className="w-24 h-24 rounded-full object-cover mb-3"
                    />

                    <h2 className="text-2xl font-semibold">
                        {currentUser.name}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {currentUser.bio}
                    </p>

                </div>

                {/* 📊 статистика */}
                <div className="grid grid-cols-3 gap-3">

                    <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
                        <div className="text-lg font-semibold">
                            {userAnimals.length}
                        </div>
                        <div className="text-xs text-gray-500">
                            Питомцы
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
                        <div className="text-lg font-semibold">
                            {userEvents.length}
                        </div>
                        <div className="text-xs text-gray-500">
                            События
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
                        <div className="text-lg font-semibold">
                            {userChats.length}
                        </div>
                        <div className="text-xs text-gray-500">
                            Чаты
                        </div>
                    </div>

                </div>

                {/* 🐶 животные */}
                <section className="flex flex-col gap-3">

                    <h3 className="text-lg font-semibold">
                        Мои питомцы
                    </h3>

                    <div className="flex gap-3 overflow-x-auto pb-2">

                        {userAnimals.map((animal: Animal) => (
                            <div
                                key={animal.id}
                                className="min-w-[140px] bg-white rounded-2xl p-2 shadow-sm"
                            >
                                <img
                                    src={animal.image}
                                    className="w-full h-24 object-cover rounded-xl"
                                />

                                <div className="mt-2 text-sm font-medium">
                                    {animal.name}
                                </div>
                            </div>
                        ))}

                    </div>

                </section>

                {/* 📅 события */}
                <section className="flex flex-col gap-3">

                    <h3 className="text-lg font-semibold">
                        Мои события
                    </h3>

                    <div className="flex flex-col gap-3">

                        {userEvents.map(event => (
                            <div
                                key={event.id}
                                className="bg-white rounded-2xl p-3 shadow-sm flex gap-3"
                            >
                                <img
                                    src={event.image}
                                    className="w-16 h-16 object-cover rounded-xl"
                                />

                                <div className="flex flex-col justify-center">
                  <span className="font-medium">
                    {event.title}
                  </span>
                                    <span className="text-xs text-gray-500">
                    {event.date}
                  </span>
                                </div>
                            </div>
                        ))}

                    </div>

                </section>

                {/* 🔘 кнопка */}
                <button className="w-full bg-gradient-to-r from-[#C65D6D] to-[#E48A96] text-white py-3 rounded-full font-medium active:scale-95 transition">
                    Редактировать профиль
                </button>

            </main>

            <BottomNav />

        </div>
    )
}