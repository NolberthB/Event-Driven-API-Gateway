import type { Event } from "./event"

type Middleware = (event: Event, next: () => Promise<void>) => Promise<void>

// Onion pattern — cada middleware decide si pasa al siguiente

export function buildPipeline(middlewares: Middleware[]) { 
    return async (event: Event) => {

        let index = 0
        const next = async () => {
            if (index < middlewares.length) { // 
                await middlewares[index++](event, next)
            }
        }
        await next()
    }
}