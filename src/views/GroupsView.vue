<script setup>
import { useMessageStore } from '@/stores/message'
import { computed } from 'vue'
import GroupedTeaserList from '@/components/organisms/GroupedTeaserList.vue'
import GroupTeaser from '@/components/molecules/GroupTeaser.vue'

const messageStore = useMessageStore()
/* can be replaced with query */
const allWithoutJoined = computed(() =>
  messageStore.allGroups.filter(
    (y) => messageStore.groups.filter((x) => x.name === y.name).length === 0
  )
)
const filteredGroups = computed(() =>
  messageStore.allGroups.filter(
    (x) =>
      (x.name.match(new RegExp(`.*${messageStore.search}.*`, 'i')) ||
        x.organisation.name.match(new RegExp(`.*${messageStore.search}.*`, 'i'))) &&
      allWithoutJoined.value.filter((y) => x.name === y.name).length > 0
  )
)
</script>
<template>
  <h2 class="text-2xl my-4 text-center">Groups</h2>
  <GroupedTeaserList :type="`groups`">
    <template v-slot:longList>
      <GroupTeaser
        v-for="g in messageStore.groups"
        :key="g.id"
        :item="g"
        :link="false"
        :show-checked="true"
      />
    </template>
    <template v-slot:shortList>
      <GroupTeaser
        v-for="g in filteredGroups"
        :key="g.id"
        :item="g"
        :link="false"
        :show-checked="true"
      />
    </template>
  </GroupedTeaserList>
</template>
<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>