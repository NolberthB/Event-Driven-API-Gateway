import type { Event } from "../../core/event"

export function sendToLogger(event: Event) {
    console.log("📦 Event sent to logger:", event)
}