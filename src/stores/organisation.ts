import { ref } from 'vue'
import { defineStore } from 'pinia'
import { apiAxios } from '@/instances/apiAxios'

export const useOrganisationStore = defineStore('organisation', () => {
  const userOrgans = ref<Organisation[]>([])
  const nonUserOrgans = ref<Organisation[]>([])
  const allOrgans = ref<Organisation[]>([])

  const getAllOrgans = async () => {
    try {
      const { data: gr } = await apiAxios.get('/organisations/all')
      allOrgans.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const getUserOrgans = async () => {
    try {
      const { data: gr } = await apiAxios.get('/organisations')
      userOrgans.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const getNonUserOrgans = async () => {
    try {
      const { data: gr } = await apiAxios.get('/organisations/not-joined')
      nonUserOrgans.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const getOrganInfo = async (id: string) => {
    try {
      const { data: gr } = await apiAxios.get(`/organisations/${id}`)
      selectedOrgan.value = gr
    } catch (err) {
      console.error(err)
    }
  }
  const createOrgan = async (payload: { name: string; description: string }) => {
    try {
      const { data: d } = await apiAxios.post(`/organisations`, payload)
      return { id: d?.organisation_id }
    } catch (e: any) {
      return e?.response?.data
    }
  }
  const joinRequest = async (payload: { id: string; motivation: string }) => {
    try {
      await apiAxios.post(`/organisations/${payload.id}/join-request`, payload)
    } catch (e: any) {
      return e?.response?.data
    }
  }
  const search = ref<string>('')
  const selectedOrgan = ref<Object | null>(null)
  return {
    search,
    allOrgans,
    userOrgans,
    nonUserOrgans,
    selectedOrgan,
    getAllOrgans,
    getUserOrgans,
    getNonUserOrgans,
    getOrganInfo,
    createOrgan,
    joinRequest
  }
})
