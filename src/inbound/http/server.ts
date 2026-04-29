import type { Event } from "../../core/event"

import { buildPipeline } from "../../core/pipeline"
import { validateEvent } from "../../middlewares/validateEvent"
import { logIncoming } from "../../middlewares/logIncoming"
import { routeEvent } from "../../core/router"

const pipeline = buildPipeline([
  validateEvent,
  logIncoming,
  routeEvent
])

Bun.serve({
  port: 3000,
  async fetch(req) {

    const url = new URL(req.url)

    if (req.method === "POST" && url.pathname === "/events") {
      // Handle POST requests to /events
      const event = await req.json() as Event

      try {
        await pipeline(event)
        return new Response("Event received", { status: 202 })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Internal server error'
        return Response.json({ error: message }, { status: 400 })
      }
      
      return new Response("Event received", { status: 202 })
    }

    if (req.method === "GET" && url.pathname === "/events") {
      // Handle GET requests to /event
      return Response.json({
        supportedEvents: ["user.created", "audit.log"]
      })
    }

    return Response.json(
      { error: "Route not found" },
      { status: 404 }
    )
  }
})

console.log("API Gateway listening on http://localhost:3000") 