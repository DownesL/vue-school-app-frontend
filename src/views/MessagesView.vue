<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import { computed, watchEffect } from 'vue'
import SearchFilter from '@/components/atoms/SearchFilter.vue'
import router from '@/router'
import ToggleInput from '@/components/atoms/ToggleInput.vue'

const props = defineProps({
  search: {
    required: false,
    type: String,
    default: ''
  },
  flagged: {
    required: false,
    type: String,
    default: '0'
  },
  unread: {
    required: false,
    type: String,
    default: '0'
  }
})

const messageStore = useMessageStore()
messageStore.getUserMessages()
messageStore.getFlaggedMessages()
messageStore.$patch({
  search: props.search,
  flagged: props.flagged === '1',
  unread: props.unread === '1'
})

const messages = computed(() => {
  if (messageStore.flagged) {
    return messageStore.flaggedMessages ?? []
  }
  return messageStore.userMessages ?? []
})

const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr?.reduce((groups, item) => {
    ;(groups[key(item)] ||= []).push(item)
    return groups
  }, {} as Record<K, T[]>)
const applyFilter = (arr: Message[]): Message[] =>
  arr?.filter(
    (x: Message) =>
      (x.name + x.group_name + x.organisation_name + (x.group_attr?.alias ?? '')).match(
        new RegExp(`.*${messageStore.search}.*`, 'i')
      ) && (messageStore.unread ? !x.message_attr?.read : true)
  )

const messagesByMonth = computed<Record<string, Message[]>>(() =>
  groupBy<Message, string>(applyFilter(messages.value), (i: Message) => {
    if (i.created_at) {
      return new Date(i.created_at).toLocaleDateString('en-GB', { month: 'long', year: '2-digit' })
    }
    return '1 Apr'
  })
)
watchEffect(() => {
  router.replace({
    name: 'messages',
    query: {
      q: messageStore.search,
      flagged: `${messageStore.flagged}`,
      unread: `${messageStore.unread}`
    }
  })
})
</script>
<template>
  <h1 class="sr-only">Messages</h1>
  <form novalidate>
    <SearchFilter v-model:search="messageStore.search" />
    <ToggleInput v-model:value="messageStore.flagged" name="flagged" />
    <ToggleInput v-model:value="messageStore.unread" name="unread" />
  </form>
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
