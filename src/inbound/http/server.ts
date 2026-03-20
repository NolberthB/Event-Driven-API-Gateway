import { routeEvent } from "../../core/router"
import type { Event } from "../../core/event"

Bun.serve({
  port: 3000,
  async fetch(req) {

    const url = new URL(req.url)

    if (req.method === "POST" && url.pathname === "/events") {
      // Handle POST requests to /events
      const event = await req.json() as Event
      await routeEvent(event)
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