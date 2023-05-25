import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios } from '@/instances/apiAxios'

export const useMessageStore = defineStore('message', () => {
  const userMessages = ref<Message[]>([])
  const recentMessages = ref<Message[]>()
  const flaggedMessages = ref<Message[]>()
  const selectedMessage = ref<Message | null>(null)
  const getUserMessages = async () => {
    try {
      isLoading.value = true
      const { data: msg } = await apiAxios.get('/messages')
      userMessages.value = msg.data
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
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
  const getFlaggedMessages = async () => {
    try {
      const { data: msg } = await apiAxios.get('/messages/flagged')
      flaggedMessages.value = msg.data
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
  const setFlagged = async (id: string) => {
    try {
      const {data: m} = await apiAxios.post(`/messages/${id}/flag`)
      selectedMessage.value = m.data
    } catch (e: any) {
      console.error(e)
    }
  }

  const isLoading = ref(false)
  const filters = ref<Filters>({ groups: null })
  const search = ref('')
  const flagged = ref(false)
  const unread = ref(false)
  return {
    userMessages,
    recentMessages,
    flaggedMessages,
    selectedMessage,
    filters,
    search,
    flagged,
    unread,
    isLoading,
    getUserMessages,
    getRecentMessages,
    getFlaggedMessages,
    getSpecificMessage,
    createMessage,
    setFlagged,
  }
})
