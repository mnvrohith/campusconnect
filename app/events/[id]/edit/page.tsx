"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditEventPage() {

  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading]
    = useState(true);

  const [formData, setFormData]
    = useState({
      title: "",
      description: "",
      category: "",
      location: "",
      imageUrl: "",
      date: "",
    });

  useEffect(() => {

    async function fetchEvent() {

      try {

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`
        );

        const data = await res.json();

        const event = data.event;

        setFormData({
          title: event.title || "",
          description:
            event.description || "",
          category:
            event.category || "",
          location:
            event.location || "",
          imageUrl:
            event.imageUrl || "",
          date: event.date
            ? event.date.slice(0, 10)
            : "",
        });

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    fetchEvent();

  }, [id]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement
      | HTMLTextAreaElement
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

      const res = await fetch(
        `/api/events/${id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        alert(
          data.error || "Update failed"
        );

        return;

      }

      alert("Event updated");

      router.push(`/events/${id}`);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  }

  if (loading) {

    return (
      <main className="min-h-screen flex items-center justify-center">

        <p className="text-slate-400">
          Loading...
        </p>

      </main>
    );

  }

  return (
    <main className="min-h-screen px-6 py-16">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-bold">
          Edit Event
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800"
            required
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800"
            required
          />

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition font-semibold"
          >
            Update Event
          </button>

        </form>

      </div>

    </main>
  );

}