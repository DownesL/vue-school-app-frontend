<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import { computed } from 'vue'

const messageStore = useMessageStore()

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)
const applyFilter = (arr: any[]) =>
  arr.filter((x) => {
    let include = true;

    if (messageStore.filters.groups) {
      include = include && (messageStore.filters.groups.includes(x.group))
    }

    return include
  })

const messagesByMonth = computed(() =>
  groupBy(applyFilter(messageStore.messages), (i) =>
    new Date(i.date).toLocaleDateString('en-GB', { month: 'long', year: '2-digit' })
  )
)
</script>
<template>
  <section v-for="(value, key, index) in messagesByMonth" :key="index" class="w-11/12 mx-auto">
    <h2 class="ml-3 mt-6 -mb-2 font-semibold text-gray-600">{{ key }}</h2>
    <MessageTeaser v-for="(i, index) in value" :key="index" :item="i" />
  </section>
</template>