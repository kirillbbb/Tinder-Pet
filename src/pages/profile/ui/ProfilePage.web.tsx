import { useEffect, useState } from 'react'
import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'
import { useAppStore } from '@/shared/model/store'
import { AddAnimalModal } from '@/widgets/add-animal-modal/AddAnimalModal'

export const ProfilePage = () => {
    const {
        user,
        fetchUser,
        myAnimals,
        fetchMyAnimals,
        deleteAnimal
    } = useAppStore()

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchUser()
        fetchMyAnimals()
    }, [])

    return (
        <div className="h-screen flex flex-col">

            <Header title="Профиль" />

            <main className="flex-1 px-4 py-4 flex flex-col gap-6 max-w-lg mx-auto w-full pb-24">

                {/* 👤 USER */}
                <div className="bg-white rounded-[28px] shadow p-4 flex flex-col items-center">

                    {user && (
                        <>
                            <div className="w-24 h-24 rounded-full overflow-hidden mb-3 bg-gray-200">
                                {user.avatar && (
                                    <img src={user.avatar} className="w-full h-full object-cover" />
                                )}
                            </div>

                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <span className="text-gray-500 text-sm">{user.email}</span>
                        </>
                    )}

                </div>

                {/* 🐶 ANIMALS */}
                <div className="flex flex-col gap-3">

                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Мои питомцы</h3>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#C65D6D]"
                        >
                            + Добавить
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">

                        {myAnimals.map(animal => (
                            <div
                                key={animal.id}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden"
                            >

                                {/* IMAGE */}
                                {animal.image ? (
                                    <img
                                        src={animal.image}
                                        className="w-full h-28 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                                        Нет фото
                                    </div>
                                )}

                                <div className="p-2 flex flex-col gap-2">

                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">
                                            {animal.name}
                                        </span>
                                        <span className="text-gray-500">
                                            {animal.age}
                                        </span>
                                    </div>

                                    {/* 🔥 ACTIONS */}
                                    <div className="flex gap-2">

                                        <button
                                            onClick={() => deleteAnimal(animal.id)}
                                            className="flex-1 bg-red-100 text-red-600 py-1 rounded-lg text-xs"
                                        >
                                            Удалить
                                        </button>

                                        {/* EDIT пока заглушка */}
                                        <button
                                            className="flex-1 bg-gray-100 py-1 rounded-lg text-xs"
                                        >
                                            Изменить
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                        {myAnimals.length === 0 && (
                            <span className="text-gray-400 text-sm">
                                У вас пока нет питомцев
                            </span>
                        )}

                    </div>

                </div>

            </main>

            <BottomNav />

            <AddAnimalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </div>
    )
}