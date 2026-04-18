import { motion, useMotionValue, useTransform } from 'framer-motion'
import {
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react'
import type { Animal } from '@/entities/animal'
import { AnimalCard } from '@/entities/animal'
import { useSwipeAnimal } from '../model/useSwipeAnimal'

interface Props {
    animal: Animal
}

export interface SwipeRef {
    swipeLeft: () => void
    swipeRight: () => void
}

export const SwipeableAnimalCard = forwardRef<SwipeRef, Props>(
    ({ animal }, ref) => {
        const { handleSwipe } = useSwipeAnimal()

        const x = useMotionValue(0)
        const rotate = useTransform(x, [-200, 200], [-15, 15])

        const likeOpacity = useTransform(x, [0, 150], [0, 1])
        const dislikeOpacity = useTransform(x, [-150, 0], [1, 0])

        const [isExiting, setIsExiting] = useState(false)
        const [exitX, setExitX] = useState(0)

        const triggerSwipe = (direction: 'left' | 'right') => {
            const value = direction === 'right' ? 300 : -300
            setExitX(value)
            setIsExiting(true)
        }

        useImperativeHandle(ref, () => ({
            swipeLeft: () => triggerSwipe('left'),
            swipeRight: () => triggerSwipe('right'),
        }))

        return (
            <motion.div
                style={{ x, rotate }}
                drag={!isExiting ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(event, info) => {
                    if (Math.abs(info.offset.x) < 100) return

                    setExitX(info.offset.x)
                    setIsExiting(true)
                }}
                animate={
                    isExiting
                        ? {
                            x: exitX,
                            opacity: 0,
                        }
                        : {
                            x: 0,
                            opacity: 1,
                        }
                }
                onAnimationComplete={() => {
                    if (!isExiting) return

                    handleSwipe(exitX, animal.id)

                    // 🔥 КРИТИЧЕСКИЙ ФИКС
                    setIsExiting(false)
                    setExitX(0)
                }}
                className="relative w-full"
            >
                {/* LIKE */}
                <motion.div
                    style={{ opacity: likeOpacity }}
                    className="absolute top-6 left-6 text-green-500 text-2xl font-bold border-4 border-green-500 px-4 py-2 rounded-lg"
                >
                    LIKE
                </motion.div>

                {/* NOPE */}
                <motion.div
                    style={{ opacity: dislikeOpacity }}
                    className="absolute top-6 right-6 text-red-500 text-2xl font-bold border-4 border-red-500 px-4 py-2 rounded-lg"
                >
                    NOPE
                </motion.div>

                <AnimalCard animal={animal} />
            </motion.div>
        )
    }
)