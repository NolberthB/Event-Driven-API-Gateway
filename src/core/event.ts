type UUID = string
type ISO8601 = string

export type Event<TPayload = unknown> =  {
        id: UUID
        type: string
        source: string
        timestamp: ISO8601
        payload: TPayload
    }
