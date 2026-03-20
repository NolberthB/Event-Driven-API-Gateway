import { sendToLogger } from "../outbound/logger/logger.adapter"
import type { Event } from "./event"

type EventHandler = (event: Event) => Promise<void> | void

const registry: Record<string, EventHandler[]> = {
    "user.created": [sendToLogger],
    "audit.log": [sendToLogger],
    "health.check": [sendToLogger]
}

export function getHandlers(type: string): EventHandler[] {
   const handlers = registry[type]
   if (!handlers) {
    throw new Error(`Unknown event type: ${type}`)
   }
   return handlers
}