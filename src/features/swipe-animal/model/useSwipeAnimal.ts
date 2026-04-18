import { useAppStore } from '@/shared/model/store'

const SWIPE_THRESHOLD = 100

export const useSwipeAnimal = () => {
    const likeAnimal = useAppStore(state => state.likeAnimal)
    const dislikeAnimal = useAppStore(state => state.dislikeAnimal)
    const nextAnimal = useAppStore(state => state.nextAnimal)

    const handleSwipe = (offsetX: number, animalId: number) => {
        if (offsetX > SWIPE_THRESHOLD) {
            likeAnimal(animalId)
            nextAnimal()
        }

        if (offsetX < -SWIPE_THRESHOLD) {
            dislikeAnimal(animalId)
            nextAnimal()
        }
    }

    return { handleSwipe }
}