import type ClassicEditor from '@ckeditor/ckeditor5-build-classic'

declare global {
  interface Window {
    editor: ClassicEditor
  }

  interface MessageAttributes {
    read?: boolean
    flagged?: number
  }

  interface GroupAttributes {
    alias?: string
    colour?: string
  }

  interface PersonalAttributes extends MessageAttributes, GroupAttributes {}

  interface Message {
    name: string
    description: string
    important: boolean
    groups: string[]
    content: string
    file_message: File | null
    id: number
    created_at?: string
    message_attr?: MessageAttributes
    group_attr?: GroupAttributes,
    group_name?: string,
    organisation_name?: string
  }

  interface Organisation {
    id: number
    name: string
    organisation_name?: string,
    groups: Group[],
    description: string
  }

  interface JoinRequest {
    id: number,
    user: {
      first_name: string,
      last_name: string,
    },
    status: string,
    motivation: string
  }

  interface Group {
    id: number
    name: string
    organisation_name?: string
    messages: Message[]
    group_attr: GroupAttributes
    admin?: boolean
    join_requests: JoinRequest[]
    members?: [
      {
        id: number
        first_name: string
        last_name: string
      }
    ]
  }

  interface Filters {
    groups: string[] | null
  }
}
