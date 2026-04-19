import { useEffect } from 'react'
import { useAppStore } from '@/shared/model/store'

import { Header } from '@/shared/ui'
import { BottomNav } from '@/widgets/bottom-navigation'
import { AnimalCardStack } from '@/widgets/animal-card-stack'

export const FeedPage = () => {
    const fetchAnimals = useAppStore(state => state.fetchAnimals)

    useEffect(() => {
        fetchAnimals()
    }, [fetchAnimals])

    return (
        <div className="h-screen flex flex-col">

            <Header />

            <main className="flex-1 flex items-center justify-center px-4 pb-24">
                <AnimalCardStack />
            </main>

            <BottomNav />
        </div>
    )
}