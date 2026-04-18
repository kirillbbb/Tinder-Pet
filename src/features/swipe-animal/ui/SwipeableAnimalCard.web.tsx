import {
    motion,
    useMotionValue,
    useTransform,
    animate,
} from 'framer-motion'
import {
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react'

import { useAppStore } from '@/shared/model/store'
import { AnimalCard } from '@/entities/animal'
import type { Animal } from '@/entities/animal'

export interface SwipeRef {
    swipeLeft: () => void
    swipeRight: () => void
}

interface Props {
    animal: Animal
}

export const SwipeableAnimalCard = forwardRef<SwipeRef, Props>(
    ({ animal }, ref) => {
        const likeAnimal = useAppStore(state => state.likeAnimal)
        const dislikeAnimal = useAppStore(state => state.dislikeAnimal)
        const nextAnimal = useAppStore(state => state.nextAnimal)

        // 🔥 состояние "карточка ушла"
        const [isGone, setIsGone] = useState(false)

        // движение
        const x = useMotionValue(0)

        // наклон
        const rotate = useTransform(x, [-200, 200], [-15, 15])

        // прозрачность
        const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5])

        // тень
        const boxShadow = useTransform(
            x,
            [-200, 0, 200],
            [
                '0 10px 30px rgba(0,0,0,0.2)',
                '0 20px 50px rgba(0,0,0,0.15)',
                '0 10px 30px rgba(0,0,0,0.2)',
            ]
        )

        // 🔥 свайп
        const swipe = async (dir: 'left' | 'right') => {
            const toX = dir === 'right' ? window.innerWidth : -window.innerWidth

            animate(x, toX, {
                type: 'spring',
                stiffness: 200,
                damping: 20,
            })

            setIsGone(true)

// 🔥 сразу переключаем карточку
            if (dir === 'right') {
                likeAnimal(animal.id)
            } else {
                dislikeAnimal(animal.id)
            }

            nextAnimal()
        }

        useImperativeHandle(ref, () => ({
            swipeLeft: () => swipe('left'),
            swipeRight: () => swipe('right'),
        }))

        // 🔥 если ушла — не рендерим
        if (isGone) return null

        return (
            <motion.div
                className="absolute inset-0"
                style={{ x, rotate, opacity, boxShadow }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                }}
                onDragEnd={(_, info) => {
                    if (info.offset.x > 120) {
                        swipe('right')
                    } else if (info.offset.x < -120) {
                        swipe('left')
                    }
                    // иначе вернётся назад
                }}
            >
                <AnimalCard animal={animal} />
            </motion.div>
        )
    }
)