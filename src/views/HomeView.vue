<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import { useMessageStore } from '@/stores/message'
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import AppLink from '@/components/atoms/AppLink.vue'
import { useGroupStore } from '@/stores/group'
import MessagesTab from '@/components/organisms/MessagesTab.vue'

const messageStore = useMessageStore()
const groupStore = useGroupStore()

messageStore.getRecentMessages()
messageStore.getFlaggedMessages()
groupStore.getUserGroups()
</script>

<template>
  <h1>Home</h1>
  <div>
    <PageTeaser v-if="!groupStore.userGroups?.length">
      <template v-slot:title> Messages</template>
      <template v-slot:content>
        <p class="text-center my-2">Wow, so empty! Seems like you don't belong to a group yet!</p>
        <AppLink :url="{ name: 'groups' }">Join a group</AppLink>
      </template>
    </PageTeaser>

    <template v-else>
      <MessagesTab :messages="messageStore.recentMessages as Message[]">
        <AppLink :url="{ name: 'messages' }">View Messages</AppLink>
      </MessagesTab>

      <PageTeaser>
        <template v-slot:title> Flagged Messages</template>
        <template v-slot:content>
          <template v-if="messageStore.flaggedMessages?.length">
            <ul>
              <MessageTeaser
                v-for="m in messageStore.flaggedMessages.slice(
                  0,
                  Math.min(3, messageStore.flaggedMessages.length)
                )"
                :key="m.id"
                :item="m"
              />
            </ul>
          </template>
          <p v-else>You have no flagged messages!</p>
          <AppLink :url="{ name: 'messages', query: { flagged: true } }"
            >View flagged messages
          </AppLink>
        </template>
      </PageTeaser>
    </template>
  </div>
</template>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

div {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (min-width: 1080px) {
    width: 80%;
    margin-inline: auto;
    gap: 2rem;
  }
}
</style>
