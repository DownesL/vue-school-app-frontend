import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios } from '@/instances/apiAxios'

export const useGroupStore = defineStore('group', () => {
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

  interface Filters {
    groups: string[] | null
  }

  const userGroups = ref<Group[]>([])
  const nonUserGroups = ref<Group[]>([])
  const allGroups = ref<any>()

  const getAllGroups = async () => {
    try {
      const { data: gr } = await apiAxios.get('/groups/all')
      allGroups.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const getUserGroups = async () => {
    try {
      const { data: gr } = await apiAxios.get('/groups')
      userGroups.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const getNonUserGroups = async () => {
    try {
      const { data: gr } = await apiAxios.get('/groups/not-joined')
      nonUserGroups.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const getGroupInfo = async (id: string) => {
    try {
      const { data: gr } = await apiAxios.get(`/groups/${id}`)
      selectedGroup.value = gr.data
    } catch (err) {
      console.error(err)
    }
  }
  const createGroup = async (payload: {
    name: string
    description: string
    organisation_id: Number
  }) => {
    try {
      const { data: d } = await apiAxios.post(
        `/organisations/${payload.organisation_id}/groups`,
        payload
      )
      return { id: d?.group_id }
    } catch (e: any) {
      return e?.response?.data
    }
  }

  const filters = ref<Filters>({ groups: null })
  const search = ref<string>('')
  const selectedGroup = ref<Group | null>(null)
  return {
    search,
    filters,
    allGroups,
    userGroups,
    nonUserGroups,
    selectedGroup,
    getAllGroups,
    getUserGroups,
    getNonUserGroups,
    getGroupInfo,
    createGroup
  }
})
