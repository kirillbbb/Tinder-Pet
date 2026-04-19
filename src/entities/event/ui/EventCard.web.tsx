import type { Event } from '../model/types'

interface Props {
    event: Event & {
        organizerName?: string
        organizerAvatar?: string
    }
}

export const EventCard = ({ event }: Props) => {
    return (
        <div className="bg-white rounded-[28px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)]">

            {/* картинка */}
            {event.image ? (
                <img
                    src={event.image}
                    className="w-full h-52 object-cover"
                />
            ) : (
                <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-400">
                    Нет фото
                </div>
            )}

            <div className="p-4 flex flex-col gap-3">

                {/* верх */}
                <div className="flex justify-between items-center">
                    {event.popular && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              ПОПУЛЯРНОЕ
            </span>
                    )}

                    <button className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center active:scale-90 transition">
                        ❤️
                    </button>
                </div>

                {/* название */}
                <h2 className="text-xl font-semibold">
                    {event.title}
                </h2>

                {/* 👤 организатор */}
                {event.organizerName && (
                    <div className="flex items-center gap-2">
                        <img
                            src={event.organizerAvatar}
                            className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-500">
              {event.organizerName}
            </span>
                    </div>
                )}

                {/* инфа */}
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>📅 {event.date}</span>
                    <span>📍 {event.location}</span>
                </div>

                {/* кнопка */}
                <button className="mt-2 bg-gradient-to-r from-[#C65D6D] to-[#E48A96] text-white py-3 rounded-full font-medium active:scale-95 transition">
                    Участвовать
                </button>

            </div>
        </div>
    )
}