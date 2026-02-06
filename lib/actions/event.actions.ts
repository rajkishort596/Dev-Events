"use server";

import Event from "@/models/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug });

    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
  } catch {
    return [];
  }
};

export const getAllEvents = async () => {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    return event ? JSON.parse(JSON.stringify(event)) : null;
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
};
