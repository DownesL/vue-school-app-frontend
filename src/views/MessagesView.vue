<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import { computed } from 'vue'
import SearchFilter from '@/components/atoms/SearchFilter.vue'

const messageStore = useMessageStore()
messageStore.getUserMessages()

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr?.reduce((groups, item) => {
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)
const applyFilter = (arr: Message[]): Message[] =>
  arr?.filter((x: Message) => (x.name + x.group_name + x.organisation_name + (x.group_attr?.alias ?? '')).match(new RegExp(`.*${messageStore.search}.*`,'i')))

const messagesByMonth = computed<Record<string, Message[]>>(() =>
  groupBy<Message, string>(applyFilter(messageStore.userMessages), (i) =>
    new Date(i.created_at).toLocaleDateString('en-GB', { month: 'long', year: '2-digit' })
  )
)
</script>
<template>
  <h1 class="sr-only">Messages</h1>
  <SearchFilter v-model:search="messageStore.search" />
  <section v-for="(value, key, index) in messagesByMonth" :key="index" class="w-11/12 mx-auto">
    <h2>{{ key }}</h2>
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
