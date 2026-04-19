import { useState } from 'react'
import { useAppStore } from '@/shared/model/store'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const AddAnimalModal = ({ isOpen, onClose }: Props) => {
    const addAnimal = useAppStore(state => state.addAnimal)

    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [desc, setDesc] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')

    if (!isOpen) return null

    const handleCreate = async () => {
        if (!name || !age) return

        try {
            await addAnimal({
                name,
                years_of_age: Number(age),
                description: desc,
                photo_url: photoUrl || null,
            })

            setName('')
            setAge('')
            setDesc('')
            setPhotoUrl('')

            onClose()

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-sm rounded-2xl p-4 flex flex-col gap-3">

                <h2 className="text-lg font-semibold text-center">
                    Новый питомец
                </h2>

                <input
                    placeholder="Имя"
                    className="border p-2 rounded-lg"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    placeholder="Возраст"
                    className="border p-2 rounded-lg"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />

                <textarea
                    placeholder="Описание"
                    className="border p-2 rounded-lg"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />

                <input
                    placeholder="Ссылка на фото (https://...)"
                    className="border p-2 rounded-lg"
                    value={photoUrl}
                    onChange={e => setPhotoUrl(e.target.value)}
                />

                {photoUrl && (
                    <img
                        src={photoUrl}
                        className="w-full h-32 object-cover rounded-lg"
                    />
                )}

                <button
                    onClick={handleCreate}
                    className="bg-[#C65D6D] text-white py-2 rounded-lg"
                >
                    Создать
                </button>

                <button
                    onClick={onClose}
                    className="text-gray-400"
                >
                    Отмена
                </button>

            </div>

        </div>
    )
}