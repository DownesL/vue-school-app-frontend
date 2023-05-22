import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios } from '@/instances/apiAxios'

export const useMessageStore = defineStore('message', async () => {
  interface Organisation {
    name: string
  }

  interface Group {
    id: number
    name: string
    alias: string
    colour: string
    organisation: Organisation
  }

  interface Message {
    id: number
    title: string
    date: any
    group: Group
    important: Boolean
    read: Boolean
    text: string
  }

  interface Filters {
    groups: string[] | null
  }

  const userMessages = ref<Message[]>([])
  const getUserMessages = async () => {
    try {
      const { data: msg } = await apiAxios.get('/messages')
      userMessages.value = msg.data
    } catch (err) {
      console.error(err)
    }
  }
  const recentMessages = ref<Message[]>([])
  const getRecentMessages = async () => {
    try {
      const { data: msg } = await apiAxios.get('/messages/recent')
      recentMessages.value = msg.data
    } catch (err) {
      console.error(err)
    }
  }
  const selectedMessage = ref<Message | null>(null)
  const getSpecificMessage = async (id: string) => {
    try {
      const { data: msg } = await apiAxios.get(`/messages/${id}`)
      selectedMessage.value = msg.data
    } catch (err) {
      console.error(err)
    }
  }

  const createMessage = async (payload: {
    name: string
    description: string
    important: boolean
    groups: string[]
    message: string
    file_message: File | null
    id: string
  }) => {
    try {
      const { data: d } = await apiAxios.post(`/organisations/${payload.id}/messages`, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return { id: d?.organisation_id }
    } catch (e: any) {
      return e?.response?.data
    }
  }

  const setRead = async (id: string) => {
    try {
      await apiAxios.post(`/messages/${id}/read`)
    } catch (e: any) {
      console.error(e)
    }
  }
  const setFlagged = async (id: string) => {
    try {
      await apiAxios.post(`/messages/${id}/flagged`)
    } catch (e: any) {
      console.error(e)
    }
  }

  const filters = ref<Filters>({ groups: null })
  const search = ref('')
  return {
    userMessages,
    recentMessages,
    selectedMessage,
    filters,
    search,
    getUserMessages,
    getRecentMessages,
    getSpecificMessage,
    createMessage,
    setRead,
    setFlagged
  }
})
