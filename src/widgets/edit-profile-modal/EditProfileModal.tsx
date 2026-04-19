import { useState } from 'react'
import { useAppStore } from '@/shared/model/store'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const EditProfileModal = ({ isOpen, onClose }: Props) => {
    const user = useAppStore(state => state.user)
    const updateUser = useAppStore(state => state.updateUser)

    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')

    if (!isOpen) return null

    const handleSave = async () => {
        await updateUser({
            username: name,
            email,
        })

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-5 w-full max-w-sm flex flex-col gap-3">

                <h2 className="text-lg font-semibold">Редактировать профиль</h2>

                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Имя"
                    className="border p-2 rounded-lg"
                />

                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border p-2 rounded-lg"
                />

                <button
                    onClick={handleSave}
                    className="bg-[#C65D6D] text-white py-2 rounded-lg"
                >
                    Сохранить
                </button>

                <button
                    onClick={onClose}
                    className="text-gray-500 text-sm"
                >
                    Отмена
                </button>

            </div>
        </div>
    )
}