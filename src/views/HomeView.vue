<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import {useMessageStore} from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import LargeButton from '@/components/atoms/LargeButton.vue'

const messageStore = useMessageStore()
</script>

<template>
  <PageTeaser v-if="!messageStore.groups.length">
    <template v-slot:title> Messages</template>
    <template v-slot:content>
      <p class="text-center my-2">Wow, so empty! Seems like you don't belong to a group yet!</p>
      <LargeButton :url="'/groups'">Join a group</LargeButton>
    </template>
  </PageTeaser>

  <PageTeaser v-if="messageStore.groups.length">
    <template v-slot:title>Messages</template>
    <template v-slot:content>
      <p v-if="!messageStore.messages" class="text-center my-2">
        Wow, so empty! Seems like you don’t have any unread messages!
      </p>
      <section v-else class="my-3">
        <h3 class="sr-only">unread messages</h3>
        <MessageTeaser
            v-for="(i, index) in messageStore.messages?.filter((x) => !x.read).slice(0, 3)"
            :key="index"
            :item="i"
        />
      </section>
      <LargeButton :url="'/messages'">View Messages</LargeButton>
    </template>
  </PageTeaser>

  <PageTeaser v-if="messageStore.groups.length">
    <template v-slot:title> Flagged Messages</template>
    <template v-slot:content>
      <p class="text-center my-2">You have no flagged messages!</p>
      <LargeButton :url="'/messages/flagged'">View flagged messages</LargeButton>
    </template>
  </PageTeaser>
</template>