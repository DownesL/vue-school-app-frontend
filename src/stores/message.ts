import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', () => {
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
    groups: Group[] | null
  }

  const groups = ref<Group[]>([
    {
      id: 1,
      name: 'Klas 4B',
      alias: '',
      colour: '#21be75',
      organisation: { name: 'Groene School' }
    },
    {
      id: 2,
      name: 'ELO-ICT',
      alias: 'Odisee',
      colour: '#2175be',
      organisation: { name: 'Odisee Hogeschool' }
    }
  ])
  /*
   * Allgroups will be replaced by a request to the API
   *    --> /groups
   */
  const allGroups = ref<Group[]>([
    {
      id: 1,
      name: 'Klas 4B',
      alias: '',
      colour: '#21be75',
      organisation: { name: 'Groene School' }
    },
    {
      id: 2,
      name: 'ELO-ICT',
      alias: 'Odisee',
      colour: '#2175be',
      organisation: { name: 'Odisee Hogeschool' }
    },
    {
      id: 3,
      name: 'SOCIAAL IETS',
      alias: 'Societs',
      colour: '#6d9fcc',
      organisation: { name: 'Odisee Hogeschool' }
    }
  ])
  /*
   * allOrganisations will be replaced by a request to the API
   *    --> /organisations
   */
  const allOrganisations = ref<Organisation[]>([
    { name: 'Groene School' },
    { name: 'Odisee Hogeschool' },
    { name: 'Partyvelde' },
  ])

  const organisations = ref<Organisation[]>([
    { name: 'Groene School' },
    { name: 'Odisee Hogeschool' }
  ])
  const messages = ref<Message[]>([
    {
      id: 1,
      title: 'Betaalbrief 13 April',
      date: Date.now(),
      group: {
        id: 2,
        name: 'ELO-ICT',
        alias: 'Odisee',
        colour: '#8900ff',
        organisation: { name: 'Odisee Hogeschool' }
      },
      important: true,
      read: false,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 2,
      title: 'Betaalbrief 13 April',
      date: Date.now(),
      group: {
        id: 2,
        name: 'ELO-ICT',
        alias: 'Odisee',
        colour: '#2175be',
        organisation: { name: 'Odisee Hogeschool' }
      },
      important: true,
      read: false,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 3,
      title: 'Nieuwsbrief 13 April',
      date: Date.now(),
      group: {
        id: 1,
        name: 'Klas 4B',
        alias: '',
        colour: '#21be75',
        organisation: { name: 'Groene School' }
      },
      important: false,
      read: false,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 4,
      title: 'Nieuwsbrief 13 April',
      date: Date.now(),
      group: {
        id: 1,
        name: 'Klas 4B',
        alias: '',
        colour: '#21be75',
        organisation: { name: 'Groene School' }
      },
      important: false,
      read: true,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 5,
      title: 'Betaalbrief 13 April',
      date: new Date('23 mar 2023'),
      group: {
        id: 1,
        name: 'Klas 4B',
        alias: '',
        colour: '#21be75',
        organisation: { name: 'Groene School' }
      },
      important: true,
      read: true,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 6,
      title: 'Nieuwsbrief 13 April',
      date: new Date('16 mar 2023'),
      group: {
        id: 2,
        name: 'ELO-ICT',
        alias: 'Odisee',
        colour: '#2175be',
        organisation: { name: 'Odisee Hogeschool' }
      },
      important: false,
      read: true,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 7,
      title: 'Betaalbrief 13 April',
      date: new Date('16 mar 2023'),
      group: {
        id: 1,
        name: 'Klas 4B',
        alias: '',
        colour: '#21be75',
        organisation: { name: 'Groene School' }
      },
      important: true,
      read: true,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 8,
      title: 'Nieuwsbrief 13 April',
      date: new Date('13 mar 2023'),
      group: {
        id: 2,
        name: 'ELO-ICT',
        alias: 'Odisee',
        colour: '#2175be',
        organisation: { name: 'Odisee Hogeschool' }
      },
      important: false,
      read: true,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 9,
      title: 'Nieuwsbrief 13 April',
      date: new Date('11 mar 2023'),
      group: {
        id: 2,
        name: 'ELO-ICT',
        alias: 'Odisee',
        colour: '#2175be',
        organisation: { name: 'Odisee Hogeschool' }
      },
      important: false,
      read: true,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    },
    {
      id: 10,
      title: 'Betaalbrief 13 April',
      date: new Date('9 mar 2023'),
      group: {
        id: 1,
        name: 'Klas 4B',
        alias: '',
        colour: '#21be75',
        organisation: { name: 'Groene School' }
      },
      important: true,
      read: false,
      text: 'Hallo ik ben lukas en ik weet wat ik aan het doen ben'
    }
  ])

  const filters = ref<Filters>({ groups: null })
  const search = ref('')
  const selectedGroup = ref<Group | null>(null)
  return {
    messages,
    groups,
    filters,
    organisations,
    search,
    selectedGroup,
    allGroups,
    allOrganisations
  }
})
