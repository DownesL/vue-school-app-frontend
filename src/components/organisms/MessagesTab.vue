<script lang="ts" setup>
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import type { PropType } from 'vue'

defineProps({
  messages: {
    required: true,
    type: Object as PropType<Message[]>
  }
})
</script>
<template>
  <PageTeaser>
    <template v-slot:title>Recent Messages</template>
    <template v-slot:content>
      <p v-if="!messages" class="text-center my-2">
        Wow, so empty! Seems like you don’t have any recent messages!
      </p>
      <ul v-else class="my-3">
        <MessageTeaser v-for="i in messages" :key="i.id" :item="i" />
      </ul>
      <slot></slot>
    </template>
  </PageTeaser>
</template>
<style lang="scss" scoped>
h1 {
  @include sr-only;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

h2 {
}
</style>
