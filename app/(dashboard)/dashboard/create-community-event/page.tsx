"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CreateCommunityEventPage() {

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

    startTime: "",
    endTime: "",
     registrationDeadline: "",

  mode: "offline",


    category: "",

    imageUrl: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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

              const response =
                await fetch(
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
        "/api/community-events/create",
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
          "Community event submitted for approval!"
        );

        router.push("/events");

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

    <main className="min-h-screen bg-[#020617] text-white px-6 py-16">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="mb-10">

          <h1 className="text-5xl font-black">
            Create Community Event
          </h1>

          <p className="mt-4 text-slate-400 text-lg leading-8">

            Host study groups, meetups,
            workshops, gaming nights,
            jam sessions, and more.

          </p>

        </div>

        {/* Notice */}
        <div className="mb-10 rounded-3xl border border-amber-500/20 bg-amber-500/10 p-6">

          <h2 className="text-xl font-semibold text-amber-300">
            Approval Required
          </h2>

          <p className="mt-3 text-slate-300 leading-7">

            Community events are reviewed
            by admins before being published
            to maintain quality and avoid spam.

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl"
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
              placeholder="Open Mic Night"
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
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
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
              placeholder="Student Activity Center"
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

         {/* EVENT DETAILS */}
<div className="grid md:grid-cols-2 gap-6">

  {/* Event Date */}
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

  {/* Event Mode */}
  <div>

    <label className="block mb-3 text-sm text-slate-300">
      Event Mode
    </label>

    <select
      name="mode"
      value={formData.mode}
      onChange={handleChange}
      className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
    >

      <option value="offline">
        Offline
      </option>

      <option value="online">
        Online
      </option>

      <option value="hybrid">
        Hybrid
      </option>

    </select>

  </div>

  {/* Start Time */}
  <div>

    <label className="block mb-3 text-sm text-slate-300">
      Start Time
    </label>

    <input
      type="time"
      name="startTime"
      required
      value={formData.startTime}
      onChange={handleChange}
      className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
    />

  </div>

  {/* End Time */}
  <div>

    <label className="block mb-3 text-sm text-slate-300">
      End Time
    </label>

    <input
      type="time"
      name="endTime"
      required
      value={formData.endTime}
      onChange={handleChange}
      className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
    />

  </div>

  {/* Registration Deadline */}
  <div className="md:col-span-2">

    <label className="block mb-3 text-sm text-slate-300">
      Registration Deadline
    </label>

    <input
      type="datetime-local"
      name="registrationDeadline"
      required
      value={formData.registrationDeadline}
      onChange={handleChange}
      className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
    />

  </div>

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
              placeholder="Music / Meetup / Gaming"
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
                ? "Uploading..."
                : loading
                ? "Submitting..."
                : "Submit Community Event"
            }

          </button>

        </form>

      </div>

    </main>

  );

}