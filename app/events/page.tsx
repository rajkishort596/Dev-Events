import React from "react";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/models/event.model";
import { cacheLife } from "next/cache";
import { getAllEvents } from "@/lib/actions/event.actions";

const EventsPage = async () => {
  "use cache";
  cacheLife("hours");
  const events = await getAllEvents();

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-left font-bold tracking-tight">
          Explore Every <br /> Dev Event
        </h1>
        <p className="text-light-200 text-lg max-w-2xl">
          Discover the latest hackathons, meetups, and tech conferences. Filter
          by your interests and never miss an opportunity to grow and connect
          with the developer community.
        </p>
      </div>

      <div className="space-y-8 mt-4">
        <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-gradient">All Events</h3>
          <div className="pill">
            <span className="text-white font-medium">{events.length}</span>{" "}
            Events Found
          </div>
        </div>

        <ul className="events">
          {events && events.length > 0 ? (
            events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard
                  title={event.title}
                  image={event.image}
                  slug={event.slug}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                />
              </li>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-light-200 text-xl font-martian-mono">
                No events found yet.
              </p>
              <p className="text-light-200/60">
                Be the first to create an amazing event!
              </p>
            </div>
          )}
        </ul>
      </div>
    </section>
  );
};

export default EventsPage;
