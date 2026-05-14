type EventDetailsProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventDetailsPage({
  params,
}: EventDetailsProps) {

  const { id } = await params;

  return (
    <main className="min-h-screen px-6 py-16">

      <div className="max-w-4xl mx-auto">

        <div className="h-72 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500" />

        <div className="mt-10">

          <span className="text-cyan-400 font-medium">
            Technology
          </span>

          <h1 className="mt-4 text-5xl font-bold">
            Event ID: {id}
          </h1>

          <p className="mt-6 text-slate-400 leading-8">
            This is the detailed event page for the selected campus event.
            Later this data will come from MongoDB.
          </p>

          <div className="mt-10 flex gap-4">

            <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition">
              Register Now
            </button>

            <button className="px-6 py-3 rounded-xl border border-slate-700 hover:border-slate-500 transition">
              Save Event
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}