import { routeEvent } from "../../core/router"
import type { Event } from "../../core/event"
import { sendToLogger } from "../../outbound/logger.adapter"

Bun.serve({
  port: 3000,
  fetch(req) {
    if (req.method !== "POST") {
      return new Response("Only POST allowed", { status: 405 })
    }

    return req.json().then((event: Event) => {
      const destination = routeEvent(event)

      if (destination === "logger") {
        sendToLogger(event)
      }

      return new Response("Event received")
    })
  },
})

console.log("API Gateway listening on http://localhost:3000")