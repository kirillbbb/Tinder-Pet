import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/shared/model/store'
import { SwipeableAnimalCard, type SwipeRef } from '@/features/swipe-animal'
import { AnimalCard } from '@/entities/animal'

export const AnimalCardStack = () => {
    const animals = useAppStore(state => state.animals)
    const currentIndex = useAppStore(state => state.currentIndex)

    const current = animals[currentIndex]
    const next = animals[currentIndex + 1]

    const cardRef = useRef<SwipeRef>(null)

    if (!current) return null

    return (
        <div className="flex justify-center items-center w-full h-full">
            <div className="relative w-[360px] h-[640px]">

                {/* 🔥 next */}
                {next && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ scale: 0.94, opacity: 0.5 }}
                        animate={{ scale: 0.94, opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AnimalCard animal={next} />
                    </motion.div>
                )}

                {/* 🔥 current */}
                <SwipeableAnimalCard
                    ref={cardRef}
                    key={current.id}
                    animal={current}
                />

                {/* 🔥 кнопки как в макете */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-10 z-20">

                    <button
                        className="w-16 h-16 rounded-full bg-[#EAEAEA] flex items-center justify-center text-2xl text-gray-400 shadow-sm active:scale-90 transition"
                        onClick={() => cardRef.current?.swipeLeft()}
                    >
                        ✖
                    </button>

                    <button
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C65D6D] to-[#E48A96] flex items-center justify-center text-3xl text-white shadow-xl active:scale-90 transition"
                        onClick={() => cardRef.current?.swipeRight()}
                    >
                        ❤️
                    </button>

                </div>

            </div>
        </div>
    )
}