"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CreateEventPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "",
    imageUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        "/api/events/create",
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

        alert("Event created successfully!");

        router.push("/events");

      } else {

        alert("Something went wrong");

      }

    } catch (error) {

      console.log(error);

      alert("Error creating event");

    } finally {

      setLoading(false);

    }

  }

  return (
    <main className="min-h-screen px-6 py-16">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold">
          Create Event
        </h1>

        <p className="mt-4 text-slate-400">
          Publish a new campus event.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          {/* Title */}
          <div>

            <label className="block mb-2 text-sm">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Hackathon 2026"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Description */}
          <div>

            <label className="block mb-2 text-sm">
              Description
            </label>

            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              rows={5}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Location */}
          <div>

            <label className="block mb-2 text-sm">
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="NIT DGP"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Date */}
          <div>

            <label className="block mb-2 text-sm">
              Event Date
            </label>

            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Category */}
          <div>

            <label className="block mb-2 text-sm">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Tech / Cultural / Sports"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Image URL */}
          <div>

            <label className="block mb-2 text-sm">
              Image URL
            </label>

            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 transition py-3 font-medium disabled:opacity-50"
          >

            {loading
              ? "Creating Event..."
              : "Create Event"}

          </button>

        </form>

      </div>

    </main>
  );
}