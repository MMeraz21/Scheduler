"use client";

import { api } from "@scheduler/convex/_generated/api";
import { formatEventRange } from "@scheduler/shared";
import { useQuery } from "convex/react";

export default function Home() {
  const events = useQuery(api.events.list);

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white px-6 py-4">
        <h1 className="text-xl font-semibold tracking-tight">Scheduler</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Monorepo scaffold — Next.js + Convex
        </p>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
        <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-medium">Upcoming events</h2>
          {events === undefined ? (
            <p className="mt-4 text-sm text-zinc-500">Loading from Convex…</p>
          ) : events.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">
              No events yet. Auth and the calendar UI come next.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {events.map((event) => (
                <li
                  key={event._id}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <p className="font-medium">{event.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {formatEventRange(event.startAt, event.endAt, event.allDay)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-600">
          <p className="font-medium text-zinc-800">Local development</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>
              <code className="rounded bg-zinc-100 px-1">pnpm install</code> at
              repo root
            </li>
            <li>
              <code className="rounded bg-zinc-100 px-1">pnpm dev:convex</code>{" "}
              — link Convex and start the backend
            </li>
            <li>
              <code className="rounded bg-zinc-100 px-1">pnpm dev:web</code> —
              Next.js on port 3000
            </li>
            <li>
              <code className="rounded bg-zinc-100 px-1">
                pnpm dev:electron
              </code>{" "}
              — optional desktop shell
            </li>
          </ol>
        </section>
      </main>
    </div>
  );
}
