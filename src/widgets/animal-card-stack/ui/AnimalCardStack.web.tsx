import { useRef } from 'react'
import { useAppStore } from '@/shared/model/store'
import {
    SwipeableAnimalCard,
    type SwipeRef,
} from '@/features/swipe-animal'
import { SwipeControls } from '@/features/swipe-animal/ui/SwipeControls.web'

export const AnimalCardStack = () => {
    const animals = useAppStore(state => state.animals)
    const currentIndex = useAppStore(state => state.currentIndex)

    const current = animals[currentIndex]
    const next = animals[currentIndex + 1]

    const cardRef = useRef<SwipeRef>(null)

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-full max-w-md">
                {/* next */}
                {next && (
                    <div className="absolute inset-0 scale-95 opacity-50 pointer-events-none">
                        <SwipeableAnimalCard animal={next} />
                    </div>
                )}

                {/* current */}
                {current && (
                    <SwipeableAnimalCard
                        key={current.id} // 🔥 ВАЖНО
                        ref={cardRef}
                        animal={current}
                    />
                )}
            </div>

            <SwipeControls
                onLike={() => cardRef.current?.swipeRight()}
                onDislike={() => cardRef.current?.swipeLeft()}
            />
        </div>
    )
}