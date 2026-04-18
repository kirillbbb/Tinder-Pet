import { useEffect } from 'react'
import { useAppStore } from '@/shared/model/store'
import { AnimalCardStack } from '@/widgets/animal-card-stack'

export const FeedPage = () => {
    const fetchAnimals = useAppStore(state => state.fetchAnimals)
    const currentAnimal = useAppStore(state => state.getCurrentAnimal())
    const isLoading = useAppStore(state => state.isLoading)
    const error = useAppStore(state => state.error)

    useEffect(() => {
        fetchAnimals()
    }, [fetchAnimals])

    if (isLoading) {
        return <div className="page-loader">Loading...</div>
    }

    if (error) {
        return <div className="page-state">Error: {error}</div>
    }

    if (!currentAnimal) {
        return <div className="page-state">No more animals 🐾</div>
    }

    return (
        <div className="page-container">
            <AnimalCardStack />
        </div>
    )
}