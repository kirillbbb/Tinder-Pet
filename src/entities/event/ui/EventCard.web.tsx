import type { Event } from '../model/types'

export const EventCard = ({ event }: { event: Event }) => {
    return (
        <div className="event-card">
            <img src={event.image} className="event-card__image" />
            <div className="event-card__title">{event.title}</div>
            <div className="event-card__date">{event.date}</div>
        </div>
    )
}