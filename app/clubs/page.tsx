import ClubCard from "@/components/cards/ClubCard";
import { mockClubs } from "@/constants/mockClubs";

export default function ClubsPage() {
  return (
    <main className="min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Student Clubs
          </h1>

          <p className="mt-3 text-slate-400">
            Explore organizations and communities across campus.
          </p>

        </div>

        {/* Clubs Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {mockClubs.map((club) => (
            <ClubCard
              key={club.id}
              name={club.name}
              category={club.category}
              members={club.members}
            />
          ))}

        </div>

      </div>

    </main>
  );
}