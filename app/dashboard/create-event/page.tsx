"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CreateEventPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [image, setImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "",
    imageUrl: "",
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

  async function uploadImage() {

    if (!image) return "";

    try {

      setUploading(true);

      const reader = new FileReader();

      return await new Promise<string>(
        (resolve, reject) => {

          reader.readAsDataURL(image);

          reader.onload = async () => {

            try {

              const response = await fetch(
                "/api/upload",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    file: reader.result,
                  }),
                }
              );

              const data =
                await response.json();

              resolve(data.imageUrl);

            } catch (error) {

              reject(error);

            }

          };

        }
      );

    } catch (error) {

      console.log(error);

      return "";

    } finally {

      setUploading(false);

    }

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const imageUrl =
        await uploadImage();

      const response = await fetch(
        "/api/events/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...formData,
            imageUrl,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {

        alert(
          "Event created successfully!"
        );

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
    <main className="min-h-screen px-6 py-16 bg-[#020617] text-white">

      <div className="max-w-3xl mx-auto">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Create Event
          </h1>

          <p className="mt-4 text-slate-400 text-lg">
            Publish and showcase your
            campus event beautifully.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md"
        >

          {/* Title */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Event Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Hackathon 2026"
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
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
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              rows={6}
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Location */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Location
            </label>

            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="NIT DGP"
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Date */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Event Date
            </label>

            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
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
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Image Upload */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">
              Event Poster
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target.files?.[0];

                if (file) {

                  setImage(file);

                  setPreview(
                    URL.createObjectURL(file)
                  );

                }

              }}
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-600"
            />

            {/* Preview */}
            {preview && (

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-[300px] object-cover"
                />

              </div>

            )}

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full rounded-2xl bg-indigo-500 py-4 text-lg font-semibold hover:bg-indigo-600 transition disabled:opacity-50"
          >

            {
              uploading
                ? "Uploading Image..."
                : loading
                ? "Creating Event..."
                : "Create Event"
            }

          </button>

        </form>

      </div>

    </main>
  );
}