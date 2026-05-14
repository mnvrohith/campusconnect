import Link from "next/link";

type EventCardProps = {
    id: number;
  title: string;
  club: string;
  date: string;
  category: string;
};

export default function EventCard({
  id,
  title,
  club,
  date,
  category,
}: EventCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-indigo-500 transition">

      {/* Poster Placeholder */}
      <div className="h-48 bg-gradient-to-br from-indigo-500 to-cyan-500" />

      <div className="p-5">

        <div className="flex items-center justify-between">
          <span className="text-xs text-cyan-400 font-medium">
            {category}
          </span>

          <span className="text-xs text-slate-500">
            {date}
          </span>
        </div>

        <h2 className="mt-3 text-xl font-semibold">
          {title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Organized by {club}
        </p>
        
       <Link
  href={`/events/${id}`}
  className="block mt-5 w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 transition py-2 font-medium text-center"
>
  View Event
</Link>
        

      </div>
    </div>
  );
}