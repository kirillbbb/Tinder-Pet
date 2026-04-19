import { useEffect, useState } from 'react'
import { useAppStore } from '@/shared/model/store'

export const CreateEventModal = ({ isOpen, onClose }: any) => {
    const { createEvent, fetchTags, tags } = useAppStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [location, setLocation] = useState('')
    const [selectedTags, setSelectedTags] = useState<number[]>([])

    useEffect(() => {
        if (isOpen) {
            fetchTags()
        }
    }, [isOpen])

    const toggleTag = (id: number) => {
        setSelectedTags(prev =>
            prev.includes(id)
                ? prev.filter(t => t !== id)
                : [...prev, id]
        )
    }

    const handleSubmit = async () => {
        // 🔴 базовая валидация
        if (!title || !description || !startDate || !endDate || !location) {
            alert('Заполни все обязательные поля')
            return
        }

        try {
            await createEvent({
                title,
                description,
                start_date: new Date(startDate).toISOString(),
                end_date: new Date(endDate).toISOString(),
                location,
                tags: selectedTags,
            })

            // очистка формы
            setTitle('')
            setDescription('')
            setStartDate('')
            setEndDate('')
            setLocation('')
            setSelectedTags([])

            onClose()
        } catch (e) {
            console.error(e)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">

            <div className="bg-white w-full  rounded-t-[28px] p-4 flex flex-col gap-4 animate-slideUp">

                <h2 className="text-xl font-semibold">Создать мероприятие</h2>

                {/* Название */}
                <input
                    placeholder="Название"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="border rounded-xl p-2"
                />

                {/* Описание */}
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="border rounded-xl p-2"
                />

                {/* Дата начала */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Дата начала</span>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        className="border rounded-xl p-2"
                    />
                </div>

                {/* Дата окончания */}
                <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-500">Дата окончания</span>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        className="border rounded-xl p-2"
                    />
                </div>

                {/* Локация */}
                <input
                    placeholder="Место проведения"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="border rounded-xl p-2"
                />

                {/* Теги */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium">Теги</span>

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <button
                                key={tag.id}
                                onClick={() => toggleTag(tag.id)}
                                className={`px-3 py-1 rounded-full text-sm transition ${
                                    selectedTags.includes(tag.id)
                                        ? 'bg-[#C65D6D] text-white'
                                        : 'bg-gray-200'
                                }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Кнопки */}
                <div className="flex gap-2 pt-2">

                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-200 py-3 rounded-full"
                    >
                        Отмена
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-r from-[#C65D6D] to-[#E48A96] text-white py-3 rounded-full active:scale-95 transition"
                    >
                        Создать
                    </button>

                </div>

            </div>

        </div>
    )
}