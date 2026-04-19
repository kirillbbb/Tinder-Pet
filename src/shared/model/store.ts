import { create } from 'zustand'

import type { Animal } from '@/entities/animal'
import { fetchAnimals as fetchAnimalsApi } from '@/shared/api/animals'
import { mapAnimal } from '@/entities/animal/model/mapAnimal'
import { likeAnimalApi } from '@/shared/api/likes'
import { createAnimal } from '@/shared/api/myAnimals'
import { deleteAnimal as deleteAnimalApi, updateAnimal as updateAnimalApi } from '@/shared/api/myAnimals'

import { updateProfile, fetchProfile } from '@/shared/api/profile'
import { mapUser } from '@/entities/user/model/mapUser'

import { fetchMessages as fetchMessagesApi, sendMessage as sendMessageApi } from '@/shared/api/messages'
import { mapMessage } from '@/entities/chat/model/mapMessage'

import { fetchEvents as fetchEventsApi, participateEvent } from '@/shared/api/events'
import { apiFetch } from '@/shared/api/base'

import { fetchChats as fetchChatsApi } from '@/shared/api/chats'
import { mapChat } from '@/entities/chat/model/mapChat'

interface AppState {
    animals: Animal[]
    currentIndex: number

    deleteAnimal: (id: number) => Promise<void>
    updateAnimal: (id: number, data: any) => Promise<void>

    // 🐶 my animals
    myAnimals: Animal[]
    addAnimal: (data: any) => Promise<void>

    // 👤 user
    user: any | null
    isAuthChecked: boolean

    // 🔄 состояние
    isLoading: boolean
    error: string | null

    // 🎉 EVENTS
    events: any[]
    fetchEvents: () => Promise<void>
    participateInEvent: (id: number) => Promise<void>

    tags: any[]
    fetchTags: () => Promise<void>
    createEvent: (data: any) => Promise<void>

    // 💬 сообщения
    messages: any[]
    chats: any[]
    fetchChats: () => Promise<void>

    // ===== METHODS =====

    fetchAnimals: () => Promise<void>
    fetchMyAnimals: () => Promise<void>
    fetchUser: () => Promise<void>
    updateUser: (data: any) => Promise<void>

    likeAnimal: (id: number) => Promise<void>
    dislikeAnimal: () => void

    nextAnimal: () => void
    getCurrentAnimal: () => Animal | null

    fetchMessages: (chatId: number) => Promise<void>
    sendMessage: (chatId: number, text: string) => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
    // ===== STATE =====
    animals: [],
    myAnimals: [],
    currentIndex: 0,

    user: null,
    isAuthChecked: false,

    isLoading: false,
    error: null,

    messages: [],
    chats: [],

    // 🎉 EVENTS
    events: [],

    tags: [],

    // ===== TAGS =====
    fetchTags: async () => {
        try {
            const data = await apiFetch('/tags/')
            console.log('TAGS:', data)
            set({ tags: data })
        } catch (e) {
            console.error('Fetch tags error:', e)
        }
    },

    // ===== CHATS =====
    fetchChats: async () => {
        try {
            const data = await fetchChatsApi()
            const userId = get().user?.id

            set({
                chats: data.map((chat: any) => mapChat(chat, userId)),
            })
        } catch (e) {
            console.error('Fetch chats error:', e)
        }
    },

    // ===== EVENTS =====
    createEvent: async (data) => {
        try {
            console.log('CREATE EVENT BODY:', data)

            await apiFetch('/events/', {
                method: 'POST',
                body: JSON.stringify(data),
            })

            await get().fetchEvents()
        } catch (e) {
            console.error('Create event error:', e)
        }
    },


    fetchEvents: async () => {
        try {
            const data = await fetchEventsApi()

            console.log('EVENTS RAW:', data)

            const eventsArray = Array.isArray(data) ? data : data.results

            set({
                events: eventsArray,
            })
        } catch (e) {
            console.error('Fetch events error:', e)
        }
    },

    participateInEvent: async (eventId: number) => {
        try {
            await participateEvent(eventId)
            await get().fetchEvents()
        } catch (e) {
            console.error('Participate error:', e)
        }
    },

    deleteAnimal: async (id) => {
        try {
            await deleteAnimalApi(id)
            await get().fetchMyAnimals()
        } catch (e) {
            console.error('Delete animal error:', e)
        }
    },

    updateAnimal: async (id, data) => {
        try {
            await updateAnimalApi(id, data)
            await get().fetchMyAnimals()
        } catch (e) {
            console.error('Update animal error:', e)
        }
    },

    // ===== ANIMALS =====
    fetchAnimals: async () => {
        set({ isLoading: true, error: null })

        try {
            const data = await fetchAnimalsApi()

            console.log('API animals:', data)

            set({
                animals: data.map(mapAnimal),
                currentIndex: 0,
            })
        } catch (e) {
            console.error('Fetch animals error:', e)
            set({ error: 'Failed to load animals' })
        } finally {
            set({ isLoading: false })
        }
    },

    fetchMyAnimals: async () => {
        try {
            const data = await apiFetch('/my-animals/')

            console.log('MY ANIMALS RAW:', data)

            const animalsArray = Array.isArray(data) ? data : data.results

            set({
                myAnimals: animalsArray.map(mapAnimal),
            })
        } catch (e) {
            console.error('Fetch my animals error:', e)
        }
    },

    addAnimal: async (data) => {
        try {
            await createAnimal(data)

            await get().fetchMyAnimals()

        } catch (e) {
            console.error('Create animal error:', e)
        }
    },

    // ===== PROFILE =====
    fetchUser: async () => {
        try {
            const data = await fetchProfile()

            console.log('PROFILE RAW:', data)

            const isValidUser =
                data &&
                data.id !== null &&
                data.username &&
                data.username.length > 0

            if (!isValidUser) {
                throw new Error('User not authenticated')
            }

            set({
                user: mapUser(data),
                isAuthChecked: true,
            })
        } catch (e) {
            console.error('Fetch profile error:', e)

            set({
                user: null,
                isAuthChecked: true,
            })
        }
    },

    updateUser: async (data) => {
        try {
            const updated = await updateProfile(data)

            set({
                user: mapUser(updated),
            })
        } catch (e) {
            console.error('Update profile error:', e)
        }
    },

    // ===== LIKE =====
    likeAnimal: async (id) => {
        try {
            await likeAnimalApi(id)
        } catch (e) {
            console.error('Like failed:', e)
        }

        set(state => ({
            currentIndex: state.currentIndex + 1,
        }))
    },

    dislikeAnimal: () => {
        set(state => ({
            currentIndex: state.currentIndex + 1,
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

    // ===== MESSAGES =====
    fetchMessages: async (chatId) => {
        try {
            const data = await fetchMessagesApi(chatId)

            console.log('MESSAGES:', data)

            set({
                messages: data.map(mapMessage),
            })
        } catch (e) {
            console.error('Fetch messages error:', e)
        }
    },

    sendMessage: async (chatId, text) => {
        try {
            await sendMessageApi(chatId, text)

            const data = await fetchMessagesApi(chatId)

            set({
                messages: data.map(mapMessage),
            })
        } catch (e) {
            console.error('Send message error:', e)
        }
    },
}))