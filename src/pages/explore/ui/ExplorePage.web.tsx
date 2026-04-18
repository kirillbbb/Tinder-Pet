import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'
import { SearchInput } from '@/shared/ui/input/SearchInput'
import { Chip } from '@/shared/ui/chip/Chip'
import { EventCard } from '@/entities/event/ui/EventCard.web'

import { events } from '@/../mocks-data/events'
import { users } from '@/../mocks-data/users'
import { chats } from '@/../mocks-data/chats'

export const ExplorePage = () => {
    const navigate = useNavigate()
    const currentUserId = 1

    // 🔥 выбранное событие
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

    // 🔥 связываем события с пользователями
    const mappedEvents = events.map(event => {
        const organizer = users.find(u => u.id === event.organizerId)

        return {
            ...event,
            organizerName: organizer?.name || '',
            organizerAvatar: organizer?.avatar || '',
        }
    })

    const openChatWithOrganizer = (event: any) => {
        // 🔥 сначала ищем чат события
        const eventChat = chats.find(
            c => c.type === 'event' && c.eventId === event.id
        )

        if (eventChat) {
            navigate(`/chat/${eventChat.id}`)
            setSelectedEvent(null)
            return
        }

        // 🔥 fallback (если нет event-чата)
        const directChat = chats.find(c =>
            c.users.includes(currentUserId) &&
            c.users.includes(event.organizerId)
        )

        if (directChat) {
            navigate(`/chat/${directChat.id}`)
            setSelectedEvent(null)
        }
    }

    return (
        <div className="h-screen flex flex-col">

            <Header title="Мероприятия" />

            <main className="flex-1 px-4 py-4 flex flex-col gap-6 overflow-y-auto max-w-lg mx-auto w-full">

                {/* 🔍 поиск + фильтры */}
                <section className="flex flex-col gap-4">

                    <SearchInput />

                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <Chip active>Все</Chip>
                        <Chip>Выгул</Chip>
                        <Chip>Лекции</Chip>
                    </div>

                </section>

                {/* 🃏 события */}
                <div className="flex flex-col gap-4">
                    {mappedEvents.map(event => (
                        <div
                            key={event.id}
                            onClick={() => setSelectedEvent(event)}
                            className="cursor-pointer active:scale-[0.98] transition"
                        >
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>

            </main>

            <BottomNav />

            {/* 🔥 POPUP */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="bg-white w-full max-w-lg rounded-t-[28px] p-4 flex flex-col gap-4 animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <img
                            src={selectedEvent.image}
                            className="w-full h-48 object-cover rounded-2xl"
                        />

                        <h2 className="text-xl font-semibold">
                            {selectedEvent.title}
                        </h2>

                        <div className="flex items-center gap-2">
                            <img
                                src={selectedEvent.organizerAvatar}
                                className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-gray-500">
                {selectedEvent.organizerName}
              </span>
                        </div>

                        <p className="text-sm text-gray-600">
                            {selectedEvent.description || 'Описание мероприятия'}
                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="flex-1 bg-gray-200 py-3 rounded-full"
                            >
                                Закрыть
                            </button>

                            <button
                                onClick={() => openChatWithOrganizer(selectedEvent)}
                                className="flex-1 bg-gradient-to-r from-[#C65D6D] to-[#E48A96] text-white py-3 rounded-full"
                            >
                                Написать
                            </button>

                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}