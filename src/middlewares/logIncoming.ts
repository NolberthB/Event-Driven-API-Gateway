import type { Event } from '../core/event'

export const logIncoming = async (event: Event, next: () => Promise<void>) => {
    console.log(`Received event: 
        ${event.type}
        ${event.source} 
        ${event.timestamp}`
    )
    await next()
}