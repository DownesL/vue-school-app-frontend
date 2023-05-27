<script lang="ts" setup>
import { useMessageStore } from '@/stores/message'
import FlagButton from '@/components/atoms/FlagButton.vue'
import { computed, ref, watchEffect } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const messageStore = useMessageStore()
messageStore.getSpecificMessage(props.id)

const flagged = ref(0)
const pdfLink = computed(() => {
  return messageStore.selectedMessage?.filename
    ? `${import.meta.env.VITE_BASE_URL}/storage/${messageStore.selectedMessage?.filename}`
    : null
})
watchEffect(() => (flagged.value = messageStore.selectedMessage?.message_attr?.flagged ?? 0))
</script>
<template>
  <div class="text-container">
    <h1>{{ messageStore.selectedMessage?.name }}</h1>
    <h2>{{ messageStore.selectedMessage?.group_name }}</h2>
    <FlagButton :flagged="flagged" @click="messageStore.setFlagged(id)" />
    <object v-if="pdfLink" :data="pdfLink" type="application/pdf">
      <p>Unable to display PDF file. <a :href="pdfLink">Download</a> instead.</p>
    </object>
    <div v-else v-html="messageStore.selectedMessage?.content"></div>
  </div>
</template>
<style lang="scss" scoped>
object {
  width: 90%;
  height: 75vh;
  margin-inline: auto;
}

.text-container {
  margin-inline: 1.5rem;
  max-width: 75ch;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 760px) {
    margin-inline: auto;
  }

  h1 {
    font-weight: 600;
    margin-bottom: 2rem;
  }

  h2 {
    order: -1;
    margin: 3rem auto -2.5rem;
    font-weight: 300;
  }

  button {
    position: absolute;
    right: 0;
    top: 4rem;
  }
}
</style>
