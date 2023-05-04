<script lang="ts" setup>
import {useMessageStore} from "@/stores/message";
import LargeButton from "@/components/atoms/LargeButton.vue";

defineProps({
  type: {
    required: true,
    type: String
  }
})

const messageStore = useMessageStore()
</script>
<template>
  <ul>
    <slot name="longList"/>
    <slot name="shortList"/>
  </ul>
  <div class="flex mx-auto w-full">
    <template v-if="messageStore.selectedGroup">
      <LargeButton :url="`/${type}/${messageStore.selectedGroup.id}/join`" class="mx-auto">
        Join Group
      </LargeButton>
    </template>
    <template v-else>
      <div
          class="bg-gradient-to-r from-gray-300 to-gray-200 text-gray-500 text-lg text-center mx-auto w-10/12 rounded-md p-1 shadow-gray-400 shadow-md my-2"
      >
        Join Group
      </div>
    </template>
  </div>
</template>
