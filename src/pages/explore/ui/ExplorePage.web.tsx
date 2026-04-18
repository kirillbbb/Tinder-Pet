import { EventList } from '@/widgets/event-list'

export const ExplorePage = () => {
    return (
        <div className="page-container flex flex-col gap-6">
            <EventList />

            {/* дальше добавим shelters / orgs */}
        </div>
    )
}