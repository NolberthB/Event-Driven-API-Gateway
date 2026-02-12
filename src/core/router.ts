import type { Event } from './event'

export function routeEvent(event: Event): string {
    switch(event.type){
        case "user.created":
            return "logger"

        default:
            throw new Error(`No handler for event type: ${event.type}`)
    }
}
