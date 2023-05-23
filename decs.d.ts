declare module 'axios'

declare interface Organisation {
    name: string
}

declare interface Group {
    id: number
    name: string
    alias: string
    colour: string
    organisation: Organisation,
    messages: Object
}

interface Filters {
    groups: string[] | null
}