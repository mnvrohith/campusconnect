type ClubCardProps = {
  name: string;
  category: string;
  members: number;
};

export default function ClubCard({
  name,
  category,
  members,
}: ClubCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-500 transition">

      {/* Club Logo */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500" />

      <div className="mt-5">

        <span className="text-sm text-cyan-400">
          {category}
        </span>

        <h2 className="mt-2 text-2xl font-semibold">
          {name}
        </h2>

        <p className="mt-3 text-slate-400 text-sm">
          {members} members
        </p>

        <button className="mt-6 w-full rounded-xl border border-slate-700 hover:border-slate-500 py-2 transition">
          View Club
        </button>

      </div>

    </div>
  );
}