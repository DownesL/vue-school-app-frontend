<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import { useMessageStore } from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import AppLink from '@/components/atoms/AppLink.vue'
import { useOrganisationStore } from '@/stores/organisation'
import { useGroupStore } from '@/stores/group'

const messageStore = useMessageStore()
const groupStore = useGroupStore()

messageStore.getRecentMessages()
messageStore.getFlaggedMessages()
groupStore.getUserGroups()
</script>

<template>
  <h1>Home</h1>
  <PageTeaser v-if="!groupStore.userGroups?.length">
    <template v-slot:title> Messages</template>
    <template v-slot:content>
      <p class="text-center my-2">Wow, so empty! Seems like you don't belong to a group yet!</p>
      <AppLink :url="{ name: 'groups' }">Join a group</AppLink>
    </template>
  </PageTeaser>

  <template v-else>
    <PageTeaser>
      <template v-slot:title>Recent Messages</template>
      <template v-slot:content>
        <p v-if="!messageStore.recentMessages?.length" class="text-center my-2">
          Wow, so empty! Seems like you don’t have any recent messages!
        </p>
        <template v-else>
          <ul>
            <MessageTeaser v-for="m in messageStore.recentMessages" :key="m.id" :item="m" />
          </ul>
        </template>
        <AppLink :url="{ name: 'messages' }">View Messages</AppLink>
      </template>
    </PageTeaser>

    <PageTeaser>
      <template v-slot:title> Flagged Messages</template>
      <template v-slot:content>
        <template v-if="messageStore.flaggedMessages?.length">
          <ul>
            <MessageTeaser v-for="m in messageStore.flaggedMessages.slice(0,Math.min(3,messageStore.flaggedMessages.length))" :key="m.id" :item="m" />
          </ul>
        </template>
        <p v-else>You have no flagged messages!</p>
        <AppLink :url="{name: 'messages', query: {flagged: true}}">View flagged messages</AppLink>
      </template>
    </PageTeaser>
  </template>
</template>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
