import { create } from 'zustand'
import type { Animal } from '@/entities/animal'
import { animalsMock } from '@/shared/mocks/animals'

interface AppState {
    animals: Animal[]
    currentIndex: number

    likedAnimals: Animal[]
    dislikedAnimals: Animal[]

    isLoading: boolean
    error: string | null

    setAnimals: (data: Animal[]) => void

    likeAnimal: (id: number) => void
    dislikeAnimal: (id: number) => void
    nextAnimal: () => void

    getCurrentAnimal: () => Animal | null

    fetchAnimals: () => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
    animals: [],
    currentIndex: 0,

    likedAnimals: [],
    dislikedAnimals: [],

    isLoading: false,
    error: null,

    setAnimals: (data) => set({ animals: data }),

    likeAnimal: (id) => {
        const animal = get().animals.find(a => a.id === id)
        if (!animal) return

        set(state => ({
            likedAnimals: [...state.likedAnimals, animal],
        }))
    },

    dislikeAnimal: (id) => {
        const animal = get().animals.find(a => a.id === id)
        if (!animal) return

        set(state => ({
            dislikedAnimals: [...state.dislikedAnimals, animal],
        }))
    },

    nextAnimal: () => {
        set(state => ({
            currentIndex: state.currentIndex + 1,
        }))
    },

    getCurrentAnimal: () => {
        const { animals, currentIndex } = get()
        return animals[currentIndex] || null
    },

    fetchAnimals: async () => {
        set({ isLoading: true, error: null })

        try {
            await new Promise(res => setTimeout(res, 300))
            set({ animals: animalsMock })
        } catch {
            set({ error: 'Failed to load animals' })
        } finally {
            set({ isLoading: false })
        }
    },
}))