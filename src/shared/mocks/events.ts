import type { Event } from '@/entities/event/model/types'

export const eventsMock: Event[] = [
    {
        id: 1,
        title: 'Встреча корги в саду',
        date: '15 Октября, 14:00',
        location: 'Парк Горького',
        image:
            'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
        popular: true,
    },
    {
        id: 2,
        title: 'Прогулка с хаски',
        date: '18 Октября, 12:00',
        location: 'Сокольники',
        image:
            'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    },
]