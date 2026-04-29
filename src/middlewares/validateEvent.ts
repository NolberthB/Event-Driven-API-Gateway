import type { Event } from '../core/event';

export const validateEvent = async (event: Event, next: () => Promise<void>) => {
    if (!event.id || !event.type || !event.source || !event.timestamp) {
        throw new Error('Invalid event: missing required fields');
    }
    await next();
}