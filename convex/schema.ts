import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    startAt: v.number(),
    endAt: v.number(),
    allDay: v.boolean(),
    timezone: v.string(),
    color: v.optional(v.string()),
    userId: v.string(),
  }).index("by_user", ["userId"]),
});
