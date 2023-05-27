import { describe, expect, it, vi } from 'vitest'

import {mount, shallowMount} from '@vue/test-utils'
import GroupDetailView from '@/views/GroupDetailView.vue'
import { createTestingPinia } from '@pinia/testing'
import MessageTeaser from '../molecules/MessageTeaser.vue'

describe('GroupView', () => {
  it('renders properly', () => {
    const group = {
      id: 1,
      name: 'lukas',
      organisation_name: 'downes',
      messages: [],
      group_attr: { alias: '', colour: '' },
      join_requests: []
    }
    const wrapper = shallowMount(GroupDetailView, {
      props: { id: '1' },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              group: {
                selectedGroup: group
              }
            }
          })
        ]
      },
      stubs: ['router-link']
    })
    expect(wrapper.find('h1').text()).toContain(group.name)
  })
  it('should not have message teasers but an alternative message', function () {
    const group = {
      id: 1,
      name: 'lukas',
      messages: [],
      group_attr: { alias: '', colour: '' },
      join_requests: []
    }
    const wrapper = shallowMount(GroupDetailView, {
      props: { id: '1' },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              group: {
                selectedGroup: group
              }
            }
          })
        ]
      },
      stubs: ['router-link']
    })
    expect(wrapper.findComponent(MessageTeaser).exists()).toBeFalsy()
    const emptyGroupMessage = 'Wow, so empty! Seems like you don’t have any recent messages!'
    console.log(wrapper.findAll('p').map((x) => x.text().toLowerCase()))
    expect(wrapper.findAll('p').map((x) => x.text().toLowerCase())).not.toContain(emptyGroupMessage)
  })
  it('should not have message teasers', function () {
    const group = {
      id: 1,
      name: 'lukas',
      messages: [],
      group_attr: { alias: '', colour: '' },
      join_requests: []
    }
    const wrapper = shallowMount(GroupDetailView, {
      props: { id: '1' },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              group: {
                selectedGroup: group
              }
            }
          })
        ]
      },
      stubs: ['router-link']
    })
    expect(wrapper.findComponent(MessageTeaser).exists()).toBeFalsy()
  })
})
