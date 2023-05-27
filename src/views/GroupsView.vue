<script lang="ts" setup>
import GroupedTeaserList from '@/components/organisms/GroupedTeaserList.vue'
import GroupTeaser from '@/components/molecules/GroupedTeaser.vue'
import { useGroupStore } from '@/stores/group'
import { computed } from 'vue'

const groupStore = useGroupStore()
groupStore.getAllGroups()
groupStore.getUserGroups()
groupStore.getNonUserGroups()
const filteredGroups = computed(() =>
  groupStore.nonUserGroups?.filter(
    (x) =>
      x.name.match(new RegExp(`.*${groupStore.search}.*`, 'i')) ||
      x.organisation_name?.match(new RegExp(`.*${groupStore.search}.*`, 'i'))
  )
)
</script>
<template>
  <h1>Join Group</h1>
  <GroupedTeaserList
    v-model:search="groupStore.search"
    v-model:selected="groupStore.selectedGroup"
    :type="`Group`"
  >
    <template v-slot:longList>
      <GroupTeaser
        v-for="g in groupStore.userGroups"
        :key="g.id"
        :is-joined="true"
        :item="g"
        :show-checked="true"
      />
    </template>
    <template v-slot:shortList>
      <GroupTeaser
        v-for="g in filteredGroups.slice(0, Math.min(filteredGroups.length, 10))"
        :key="g.id"
        :item="g"
        :show-checked="true"
        @click="() => (groupStore.selectedGroup = g)"
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
