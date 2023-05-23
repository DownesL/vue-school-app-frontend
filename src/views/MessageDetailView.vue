<script lang="ts" setup>
import {useMessageStore} from '@/stores/message'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const messageStore = useMessageStore()
messageStore.getSpecificMessage(props.id)
messageStore.setRead(props.id)
</script>
<template>
  <h1>{{ messageStore.selectedMessage?.name }}</h1>
  <h2>{{ messageStore.selectedMessage?.group_name }}</h2>
  <div v-html="messageStore.selectedMessage?.content"></div>
</template>