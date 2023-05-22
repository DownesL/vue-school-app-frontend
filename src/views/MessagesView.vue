<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import { computed } from 'vue'
import MessageFilter from '@/components/molecules/MessageFilter.vue'

const messageStore = useMessageStore()
messageStore.getUserMessages()

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr?.reduce((groups, item) => {
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)
const applyFilter = (arr: any[]) =>
  arr?.filter((x) => {
    let include = true

    // if (messageStore.filters.groups?.length) {
    //   include = include && messageStore.filters.groups.includes(x.group.name)
    // }

    return include
  })

const messagesByMonth = computed(() =>
  groupBy(applyFilter(messageStore.userMessages), (i) =>
    new Date(i.created_at).toLocaleDateString('en-GB', { month: 'long', year: '2-digit' })
  )
)
</script>
<template>
  <h1 class="sr-only">Messages</h1>
  <MessageFilter />
  <section v-for="(value, key, index) in messagesByMonth" :key="index" class="w-11/12 mx-auto">
    <h2 class="ml-3 mt-6 -mb-2 font-semibold text-gray-600">{{ key }}</h2>
    <ul>
      <MessageTeaser v-for="i in value" :key="i.id" :item="i" />
    </ul>
  </section>
</template>
<style lang="scss" scoped>
section {
  width: 87%;
  margin-inline: auto;
  h2 {
    margin-left: $c;
    margin-top: $f;
    margin-bottom: -$b;
    font-weight: 300;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
