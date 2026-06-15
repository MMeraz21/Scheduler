import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

async function requireUserId(ctx: {
  auth: { getUserIdentity: () => Promise<{ subject: string } | null> };
}) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("Unauthenticated");
  }
  return identity.subject;
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    return ctx.db
      .query("events")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    startAt: v.number(),
    endAt: v.number(),
    allDay: v.boolean(),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    timezone: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);

    return ctx.db.insert("events", {
      title: args.title,
      description: args.description,
      location: args.location,
      startAt: args.startAt,
      endAt: args.endAt,
      allDay: args.allDay,
      timezone: args.timezone ?? "UTC",
      color: args.color,
      userId,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("events"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    location: v.optional(v.string()),
    startAt: v.optional(v.number()),
    endAt: v.optional(v.number()),
    allDay: v.optional(v.boolean()),
    timezone: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const event = await ctx.db.get(args.id);

    if (!event || event.userId !== userId) {
      throw new Error("Event not found");
    }

    const { id, ...patch } = args;
    await ctx.db.patch(id, patch);
  },
});

export const remove = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const event = await ctx.db.get(args.id);

    if (!event || event.userId !== userId) {
      throw new Error("Event not found");
    }

    await ctx.db.delete(args.id);
  },
});
