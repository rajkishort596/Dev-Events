"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, X } from "lucide-react";

// Schema definition
const eventSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100),
  organizer: z.string().min(2, "Organizer name is too short"),
  overview: z
    .string()
    .min(10, "Overview should be at least 10 characters")
    .max(500),
  description: z
    .string()
    .min(20, "Description should be more detailed")
    .max(1000),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  mode: z.enum(["online", "offline", "hybrid"]),
  venue: z.string().min(2, "Venue is required"),
  location: z.string().min(2, "Location is required"),
  audience: z.string().min(2, "Target audience is required"),
});

type EventFormValues = z.infer<typeof eventSchema>;

const CreateEventForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Custom states for dynamic lists
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [agenda, setAgenda] = useState<string[]>([]);
  const [currentAgendaItem, setCurrentAgendaItem] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      mode: "online",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addAgendaItem = () => {
    if (currentAgendaItem.trim()) {
      setAgenda([...agenda, currentAgendaItem.trim()]);
      setCurrentAgendaItem("");
    }
  };

  const removeAgendaItem = (index: number) => {
    setAgenda(agenda.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: EventFormValues) => {
    setIsLoading(true);
    setError("");

    if (!imageFile) {
      setError("Please upload an event image");
      setIsLoading(false);
      return;
    }

    if (tags.length === 0) {
      setError("Please add at least one tag");
      setIsLoading(false);
      return;
    }

    if (agenda.length === 0) {
      setError("Please add at least one agenda item");
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append("image", imageFile);
      data.append("tags", JSON.stringify(tags));
      data.append("agenda", JSON.stringify(agenda));

      const response = await fetch("/api/events", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        // Reset form and custom states
        reset();
        setTags([]);
        setAgenda([]);
        setImagePreview(null);
        setImageFile(null);
        setCurrentTag("");
        setCurrentAgendaItem("");

        router.push("/events");
        router.refresh();
      } else {
        setError(result.message || "Failed to create event");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Event Title</label>
          <input
            {...register("title")}
            placeholder="Next.js Conf 2026"
            className={`bg-dark-200 border ${errors.title ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Organizer</label>
          <input
            {...register("organizer")}
            placeholder="Vercel"
            className={`bg-dark-200 border ${errors.organizer ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.organizer && (
            <p className="text-red-500 text-xs">{errors.organizer.message}</p>
          )}
        </div>
      </div>

      {/* Description & Overview */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Short Overview</label>
          <input
            {...register("overview")}
            placeholder="A catchy one-sentence summary of the event"
            className={`bg-dark-200 border ${errors.overview ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.overview && (
            <p className="text-red-500 text-xs">{errors.overview.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">
            Full Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Detailed breakdown of the schedule, speakers, and highlights"
            className={`bg-dark-200 border ${errors.description ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors min-h-[150px]`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description.message}</p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-light-100 font-semibold">Event Poster</label>
        <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-center flex-col gap-4 bg-dark-200/50 hover:bg-dark-200 transition-colors cursor-pointer overflow-hidden group min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
          {imagePreview ? (
            <div className="absolute inset-0">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-center">
                <p className="text-white font-semibold">Change Image</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-3 bg-white/5 rounded-full">
                <Plus className="text-light-200" />
              </div>
              <p className="text-light-200">
                Click to upload high-quality PNG or JPG
              </p>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Logistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Date</label>
          <input
            type="date"
            {...register("date")}
            className={`bg-dark-200 border ${errors.date ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs">{errors.date.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Time</label>
          <input
            type="time"
            {...register("time")}
            className={`bg-dark-200 border ${errors.time ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.time && (
            <p className="text-red-500 text-xs">{errors.time.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Mode</label>
          <select
            {...register("mode")}
            className="bg-dark-200 border border-white/5 rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Venue</label>
          <input
            {...register("venue")}
            placeholder="Moscone Center or Zoom"
            className={`bg-dark-200 border ${errors.venue ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.venue && (
            <p className="text-red-500 text-xs">{errors.venue.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Location</label>
          <input
            {...register("location")}
            placeholder="San Francisco, CA"
            className={`bg-dark-200 border ${errors.location ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.location && (
            <p className="text-red-500 text-xs">{errors.location.message}</p>
          )}
        </div>
      </div>

      {/* Audience & Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">
            Target Audience
          </label>
          <input
            {...register("audience")}
            placeholder="Web Developers, UI Designers, or Business Leaders"
            className={`bg-dark-200 border ${errors.audience ? "border-red-500" : "border-white/5"} rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors`}
          />
          {errors.audience && (
            <p className="text-red-500 text-xs">{errors.audience.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-light-100 font-semibold">Tags</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Technology, Workshop, Networking"
              className="flex-1 bg-dark-200 border border-white/5 rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors"
            />
            <button
              type="button"
              onClick={addTag}
              className="bg-blue/20 text-blue border border-blue/30 px-4 rounded-lg hover:bg-blue/30 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-dark-100 text-light-100 text-xs rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/5"
              >
                {tag}
                <X
                  size={14}
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => removeTag(tag)}
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Agenda */}
      <div className="flex flex-col gap-2">
        <label className="text-light-100 font-semibold">Event Agenda</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={currentAgendaItem}
            onChange={(e) => setCurrentAgendaItem(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addAgendaItem())
            }
            placeholder="9:00 AM - Check-in and Coffee"
            className="flex-1 bg-dark-200 border border-white/5 rounded-[6px] px-5 py-2.5 outline-none focus:border-blue transition-colors"
          />
          <button
            type="button"
            onClick={addAgendaItem}
            className="bg-blue/20 text-blue border border-blue/30 px-4 rounded-lg hover:bg-blue/30 transition-colors"
          >
            Add
          </button>
        </div>
        <ul className="flex flex-col gap-2 mt-4">
          {agenda.map((item, index) => (
            <li
              key={index}
              className="bg-white/5 p-4 rounded-lg flex justify-between items-center group border border-transparent hover:border-white/10 transition-all"
            >
              <span className="text-light-100">{item}</span>
              <X
                size={18}
                className="text-light-200 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => removeAgendaItem(index)}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-[6px] items-center justify-center transition-all flex flex-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg cursor-pointer"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Creating Event...
          </>
        ) : (
          "Publish Event"
        )}
      </button>
    </form>
  );
};

export default CreateEventForm;
