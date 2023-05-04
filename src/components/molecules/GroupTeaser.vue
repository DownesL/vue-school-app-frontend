<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import { computed } from 'vue'
import NameSpan from "@/components/atoms/NameSpan.vue";

interface Organisation {
  id: number
  name: string
}

interface Group {
  id: number
  name: string
  alias: string
  colour: string
  organisation: Organisation
}

const props = defineProps({
  item: {
    required: true,
    type: Object
  },
  showChecked: {
    required: false,
    type: Boolean,
    default: false
  },
  link: {
    required: false,
    type: Boolean,
    default: true
  }
})
const selected = computed(() => messageStore.selectedGroup === props.item)
const isJoined = computed(
  () => messageStore.groups.filter((x) => x.id === (props.item as Group).id).length > 0
)
const messageStore = useMessageStore()
const setSelected = (el: any) => {
  if (isJoined.value) return
  if (messageStore.selectedGroup === el) messageStore.selectedGroup = null
  else messageStore.selectedGroup = el
}
</script>
<template>
  <li class="text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb w-4/5 mx-auto">
    <template v-if="link">
      <router-link :to="'/groups/' + item.id">
        <div
          :class="showChecked || selected ? 'justify-between' : 'justify-center'"
          class="bg-white py-3 flex items-center px-4"
        >
          <h3><NameSpan :group="item" /></h3>
          <svg
            v-if="showChecked && isJoined"
            fill="none"
            height="14"
            viewBox="0 0 18 14"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z"
              fill="black"
            />
          </svg>
        </div>
      </router-link>
    </template>
    <template v-else>
      <button
        :class="showChecked ? 'justify-between' : 'justify-center'"
        class="w-full h-full bg-white flex items-center py-3 px-4 gap-2"
        @click="setSelected(item)"
      >
        <span class="overflow-ellipsis overflow-hidden whitespace-nowrap"
          ><NameSpan :group="item" /></span
        >
        <svg
          v-if="showChecked && isJoined"
          fill="none"
          height="14"
          viewBox="0 0 18 14"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z"
            fill="black"
          />
        </svg>
        <span v-if="selected" class="text-sm bg-c-gr relative z-10 px-2 rounded-lg">
          selected
        </span>
      </button>
    </template>
  </li>
</template>