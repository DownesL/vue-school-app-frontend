import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios } from '@/instances/apiAxios'

export const useMessageStore = defineStore('message', () => {

  const userMessages = ref<Message[]>([])
  const recentMessages = ref<Message[]>([])
  const selectedMessage = ref<Message | null>(null)
  const getUserMessages = async () => {
    try {
      const { data: msg } = await apiAxios.get('/messages')
      userMessages.value = msg.data
    } catch (err) {
      console.error(err)
    }
  }
  const getRecentMessages = async () => {
    try {
      const { data: msg } = await apiAxios.get('/messages/recent')
      recentMessages.value = msg.data
    } catch (err) {
      console.error(err)
    }
  }
  const getSpecificMessage = async (id: string) => {
    try {
      const { data: msg } = await apiAxios.get(`/messages/${id}`)
      selectedMessage.value = msg.data
    } catch (err) {
      console.error(err)
    }
  }
  const createMessage = async (payload: Message) => {
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
