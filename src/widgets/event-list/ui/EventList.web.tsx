import { eventsMock } from '@/shared/mocks/events'
import { EventCard } from '@/entities/event'

export const EventList = () => {
    return (
        <div className="section">
            <div className="section-title">Events</div>

            <div className="horizontal-list">
                {eventsMock.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </div>
    )
}