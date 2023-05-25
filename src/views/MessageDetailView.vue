<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import FlagButton from '@/components/atoms/FlagButton.vue'
import { ref, watchEffect } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const messageStore = useMessageStore()
messageStore.getSpecificMessage(props.id)

const flagged = ref(0)

watchEffect(() => (flagged.value = messageStore.selectedMessage?.message_attr?.flagged ?? 0))
</script>
<template>
  <h1>{{ messageStore.selectedMessage?.name }}</h1>
  <h2>{{ messageStore.selectedMessage?.group_name }}</h2>
  <FlagButton :flagged="flagged" @click="messageStore.setFlagged(id)" />
  <div v-html="messageStore.selectedMessage?.content"></div>
</template>
