import EventCard from "@/components/cards/EventCard";
import { mockEvents } from "@/constants/mockEvents";

export default function EventsPage() {
  return (
    <main className="min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Explore Events
          </h1>

          <p className="mt-3 text-slate-400">
            Discover exciting campus events happening around you.
          </p>

        </div>

        {/* Events Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              id = {event.id}
              title={event.title}
              club={event.club}
              date={event.date}
              category={event.category}
            />
          ))}

        </div>

      </div>

    </main>
  );
}