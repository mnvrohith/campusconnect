async function getEvent(id: string) {

  const res = await fetch(
    `http://localhost:3000/api/events/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function EventDetailsPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {

  const { id } = await params;

  const data = await getEvent(id);

  const event = data.event;

  if (!event) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <h1 className="text-3xl font-bold">
          Event Not Found
        </h1>

      </main>
    );

  }

  return (
    <main className="min-h-screen pb-20">

      {/* Hero Image */}
      <div className="h-[400px] bg-slate-900 overflow-hidden">

        {event.imageUrl ? (

          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xl">
            No Event Image
          </div>

        )}

      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 mt-12">

        {/* Category */}
        <span className="px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm">
          {event.category}
        </span>

        {/* Title */}
        <h1 className="mt-6 text-5xl font-bold">
          {event.title}
        </h1>

        {/* Meta Info */}
        <div className="mt-8 flex flex-wrap gap-8 text-slate-400">

          <div>
            📍 {event.location}
          </div>

          <div>
            📅 {
              new Date(event.date)
                .toLocaleDateString()
            }
          </div>

          <div>
            👤 {event.createdBy?.name}
          </div>

        </div>

        {/* Description */}
        <div className="mt-12">

          <h2 className="text-2xl font-semibold">
            About This Event
          </h2>

          <p className="mt-6 text-slate-300 leading-8 whitespace-pre-line">
            {event.description}
          </p>

        </div>

      </div>

    </main>
  );
}