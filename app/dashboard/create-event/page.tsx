"use client";

import {
  useEffect,
  useState,
} from "react";

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

  const [clubs, setClubs] =
    useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "",
    imageUrl: "",
    club: "",
  });

  useEffect(() => {

    async function fetchClubs() {

      try {

        const res = await fetch(
          "/api/clubs"
        );

        const data =
          await res.json();

        setClubs(
          data.clubs || []
        );

      } catch (error) {

        console.log(error);

      }

    }

    fetchClubs();

  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  }

  async function uploadImage() {

    if (!image) return "";

    try {

      setUploading(true);

      const reader =
        new FileReader();

      return await new Promise<string>(
        (
          resolve,
          reject
        ) => {

          reader.readAsDataURL(
            image
          );

          reader.onload =
            async () => {

              try {

                const response =
                  await fetch(
                    "/api/upload",
                    {
                      method:
                        "POST",

                      headers: {
                        "Content-Type":
                          "application/json",
                      },

                      body: JSON.stringify(
                        {
                          file:
                            reader.result,
                        }
                      ),
                    }
                  );

                const data =
                  await response.json();

                resolve(
                  data.imageUrl
                );

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

      const response =
        await fetch(
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

        router.push(
          "/events"
        );

      } else {

        alert(
          data.message
        );

      }

    } catch (error) {

      console.log(error);

      alert(
        "Error creating event"
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <main className="min-h-screen bg-[#020617] text-white px-6 py-20">

      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center">

          <span className="px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">

            CampusConnect

          </span>

          <h1 className="mt-8 text-5xl font-black tracking-tight">

            Create Event

          </h1>

          <p className="mt-5 text-slate-400 text-lg">

            Publish beautiful official
            campus events.

          </p>

        </div>

        <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-5">

  <p className="text-sm text-indigo-200 leading-7">

    Official club events can only be created
    inside clubs you own or manage.

    <span className="block mt-2 text-slate-300">

      Want to host a personal meetup, workshop,
      study jam, or open event?
      Choose <span className="font-semibold text-white">Individual Event</span>.

    </span>

  </p>

</div>

        {/* Form */}
        <form
          onSubmit={
            handleSubmit
          }
          className="mt-14 space-y-8 rounded-[32px] border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-8 md:p-10 shadow-2xl"
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
              value={
                formData.title
              }
              onChange={
                handleChange
              }
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
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Describe your event..."
              rows={6}
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Location */}
            <div>

              <label className="block mb-3 text-sm text-slate-300">

                Location

              </label>

              <input
                type="text"
                name="location"
                required
                value={
                  formData.location
                }
                onChange={
                  handleChange
                }
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
                value={
                  formData.date
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
              />

            </div>

          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Category */}
            <div>

              <label className="block mb-3 text-sm text-slate-300">

                Category

              </label>

              <input
                type="text"
                name="category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                placeholder="Tech / Cultural"
                className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
              />

            </div>

            {/* Club */}
            <div>

              <label className="block mb-3 text-sm text-slate-300">

                Organizing Club

              </label>

              <select
                name="club"
                value={
                  formData.club
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 outline-none focus:border-indigo-500"
              >

                <option value="">

                  Select Club

                </option>

                {
                  clubs.map(
                    (
                      club: any
                    ) => (

                      <option
                        key={
                          club._id
                        }
                        value={
                          club._id
                        }
                      >
                        {
                          club.name
                        }
                      </option>

                    )
                  )
                }

              </select>

            </div>

          </div>

          {/* Upload */}
          <div>

            <label className="block mb-3 text-sm text-slate-300">

              Event Poster

            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {

                const file =
                  e.target
                    .files?.[0];

                if (file) {

                  setImage(file);

                  setPreview(
                    URL.createObjectURL(
                      file
                    )
                  );

                }

              }}
              className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 file:mr-4 file:rounded-xl file:border-0 file:bg-indigo-500 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-600"
            />

            {
              preview && (

                <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800">

                  <img
                    src={
                      preview
                    }
                    alt="Preview"
                    className="w-full h-[320px] object-cover"
                  />

                </div>

              )
            }

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={
              loading ||
              uploading
            }
            className="w-full rounded-2xl bg-indigo-500 py-4 text-lg font-bold hover:bg-indigo-600 transition disabled:opacity-50"
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