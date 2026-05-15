"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateClubPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logoUrl: "",
    websiteUrl: "",
    category: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(
        "/api/clubs/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {

        alert(
          "Club request submitted for approval!"
        );

        router.push("/clubs");

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <div className="text-center">

          <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
            Club Registration
          </span>

          <h1 className="mt-8 text-5xl font-black">
            Create New Club
          </h1>

          <p className="mt-5 text-slate-400 text-lg">
            Submit your club for admin approval.
          </p>
           {/* Notice */}
        <div className="mb-10 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">

         

          <p className="mt-3 text-slate-300 leading-7">

            Clubs are reviewed
            by admins before being published
            to maintain quality and avoid spam.

          </p>

        </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-16 space-y-8"
        >

          {/* Club Name */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Club Name
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Coding Club"
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Description */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Description
            </label>

            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your club..."
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Logo URL */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Logo URL
            </label>

            <input
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Website URL */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Website URL
            </label>

            <input
              type="text"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              placeholder="https://yourclub.com"
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Category */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Tech / Cultural / Sports"
              className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold text-lg disabled:opacity-50"
          >

            {
              loading
                ? "Submitting..."
                : "Submit Club Request"
            }

          </button>

        </form>

      </div>

    </main>
  );

}