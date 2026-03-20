import type { Event } from './event'
import { getHandlers } from './registry'

export async function routeEvent(event: Event): Promise<void> {
    const handlers = getHandlers(event.type)
    await Promise.all(handlers.map(h => h(event)))
}
