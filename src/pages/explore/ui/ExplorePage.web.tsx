import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'
import { SearchInput } from '@/shared/ui/input/SearchInput'
import { Chip } from '@/shared/ui/chip/Chip'
import { EventCard } from '@/entities/event/ui/EventCard.web'

import { useAppStore } from '@/shared/model/store'
import { CreateEventModal } from '@/widgets/create-event-modal/CreateEventModal'

import PlusIcon from '@/shared/assets/icons/plus-icon.svg?react'

export const ExplorePage = () => {

    const navigate = useNavigate()

    const {
        events,
        fetchEvents,
        participateInEvent,
        user
    } = useAppStore()

    const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    useEffect(() => {
        fetchEvents()
    }, [])

    const mappedEvents = events.map(event => ({
        ...event,
        organizerName: event.organizer_detail?.username || 'Организатор',
        organizerAvatar: event.organizer_detail?.avatar || '',
        image: event.cover_image || null,
    }))

    const isParticipating = (event: any) => {
        return event.is_participant || false
    }

    const isOrganizer = (event: any) => {
        return event.organizer === user?.id
    }

    const canOpenChat = (event: any) => {
        return isOrganizer(event) || isParticipating(event)
    }

    return (
        <div className="h-screen flex flex-col">

            <div className="relative max-w-2xl w-full flex flex-col h-full">

                <Header title="Мероприятия" />

                <main className="flex-1 px-4 py-4 flex flex-col gap-6 overflow-y-auto">

                    <section className="flex flex-col gap-4">
                        <SearchInput />

                        <div className="flex gap-2 overflow-x-auto pb-2">
                            <Chip active>Все</Chip>
                            <Chip>Выгул</Chip>
                            <Chip>Лекции</Chip>
                        </div>
                    </section>

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

                        {mappedEvents.length === 0 && (
                            <span className="text-gray-400 text-center">
                                Нет мероприятий
                            </span>
                        )}

                    </div>

                </main>

                <BottomNav />

                {/* FAB */}
                <button
                    onClick={() => setIsCreateOpen(true)}
                    className="absolute bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-[#C65D6D] to-[#E48A96] text-white shadow-lg flex items-center justify-center active:scale-90 transition z-40"
                >
                    <PlusIcon className="w-6 h-6" />
                </button>

            </div>

            {/* POPUP */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="bg-white w-full max-w-lg rounded-t-[28px] p-4 flex flex-col gap-4"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {selectedEvent.image ? (
                            <img
                                src={selectedEvent.image}
                                className="w-full h-48 object-cover rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
                                Нет фото
                            </div>
                        )}

                        <h2 className="text-xl font-semibold">
                            {selectedEvent.title}
                        </h2>

                        <div className="flex items-center gap-2">
                            {selectedEvent.organizerAvatar && (
                                <img
                                    src={selectedEvent.organizerAvatar}
                                    className="w-6 h-6 rounded-full"
                                />
                            )}
                            <span className="text-sm text-gray-500">
                                {selectedEvent.organizerName}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600">
                            {selectedEvent.description || 'Описание мероприятия'}
                        </p>

                        {/* КНОПКИ */}
                        <div className="flex gap-3">

                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="flex-1 bg-gray-200 py-3 rounded-full"
                            >
                                Закрыть
                            </button>

                            {isOrganizer(selectedEvent) ? (
                                <button
                                    disabled
                                    className="flex-1 bg-blue-500 text-white py-3 rounded-full"
                                >
                                    Вы организатор
                                </button>
                            ) : isParticipating(selectedEvent) ? (
                                <button
                                    disabled
                                    className="flex-1 bg-green-500 text-white py-3 rounded-full"
                                >
                                    Вы участвуете
                                </button>
                            ) : (
                                <button
                                    onClick={async () => {
                                        await participateInEvent(selectedEvent.id)
                                        setSelectedEvent(null)
                                    }}
                                    className="flex-1 bg-gradient-to-r from-[#C65D6D] to-[#E48A96] text-white py-3 rounded-full"
                                >
                                    Участвовать
                                </button>
                            )}

                        </div>

                        {/* ЧАТ */}
                        {canOpenChat(selectedEvent) && (
                            <button
                                onClick={() => navigate(`/event-chat/${selectedEvent.id}`)}
                                className="w-full bg-black text-white py-3 rounded-full"
                            >
                                Открыть чат
                            </button>
                        )}

                    </div>
                </div>
            )}

            {/* МОДАЛКА */}
            <CreateEventModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />

        </div>
    )
}