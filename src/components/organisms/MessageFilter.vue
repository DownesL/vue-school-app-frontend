<script lang="ts" setup>
import FilterPill from '@/components/atoms/FilterPill.vue'
import {useMessageStore} from '@/stores/message'
import {computed, ref} from 'vue'

const messageStore = useMessageStore()
const all = computed(() => messageStore.filters.groups.includes('All Groups'))
const handleGroupFilter = (ev: Event) => {
  const target = ev.target as HTMLInputElement
  if (target.value === 'All Groups') {
    if (!target.checked) {
      messageStore.filters.groups = messageStore.groups.filter((x) => x).map(x => x.name)
    } else {
      messageStore.filters.groups = ['All Groups']
    }
  } else {
    setFilter(target.value, target.checked)
  }
}
const setFilter = (value: string, isSelected: boolean) => {
  if (value === 'All Groups') return
  if (isSelected) {
    messageStore.filters.groups.push(value)
  } else {
    const i = messageStore.filters.groups.indexOf(value)
    messageStore.filters.groups.splice(i, 1)
  }
}
const filterBoxOpen = ref(false)
</script>
<template>
  <div>
    <div class="flex gap-1 items-center">
      <button
        :aria-expanded="filterBoxOpen"
        aria-controls="#filter-box"
        @click="() => (filterBoxOpen = !filterBoxOpen)"
      >
        <svg
          fill="none"
          height="32"
          viewBox="0 0 24 24"
          width="32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Filter</title>
          <path
            d="M14 12V19.88C14.04 20.18 13.94 20.5 13.71 20.71C13.32 21.1 12.69 21.1 12.3 20.71L10.29 18.7C10.06 18.47 9.96 18.16 10 17.87V12H9.97L4.21 4.62C3.87 4.19 3.95 3.56 4.38 3.22C4.57 3.08 4.78 3 5 3H19C19.22 3 19.43 3.08 19.62 3.22C20.05 3.56 20.13 4.19 19.79 4.62L14.03 12H14Z"
            fill="black"
          />
        </svg>
      </button>
      <div class="flex gap-2">
        <FilterPill
          v-for="(value, i) in messageStore.filters.groups"
          :key="i"
          :filter="value"
          @click="setFilter(value, false)"
        />
      </div>
    </div>
      <div
        v-if="filterBoxOpen"
        id="filter-box"
        class="w-full p-4"
      >
        <fieldset class="flex flex-col" @change="handleGroupFilter">
          <legend>Groups</legend>
          <label for="all-groups">
            All Groups
            <input id="all-groups" :checked="all" name="group" type="checkbox" value="All Groups" />
          </label>
          <label v-for="(a, index) in messageStore.groups" :key="index" :for="a">
            {{ a.name }}
            <input
              :id="a.name"
              :checked="all || messageStore.filters.groups.includes(a.name)"
              :disabled="all"
              :value="a.name"
              name="group"
              type="checkbox"
            />
          </label>
        </fieldset>
      </div>
  </div>
</template>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 350ms ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-40%) scale(0);
  top: 12%;
}
</style>