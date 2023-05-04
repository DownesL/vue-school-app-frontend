<script setup>
import { useMessageStore } from '@/stores/message'
import { computed } from 'vue'
import GroupedTeaserList from '@/components/organisms/GroupedTeaserList.vue'
import OrganisationTeaser from '@/components/molecules/OrganisationTeaser.vue'

const messageStore = useMessageStore()
/* can be replaced with query */
const allWithoutJoined = computed(() =>
  messageStore.allOrganisations.filter((y) =>
    messageStore.organisations.filter((x) => x.name === y.name).length === 0
  )
)
const filteredGroups = computed(() =>
  messageStore.allOrganisations.filter(
    (x) =>
      x.name.match(new RegExp(`.*${messageStore.search}.*`, 'i')) &&
      allWithoutJoined.value.filter((y) => x.name === y.name).length > 0
  )
)
</script>
<template>
  <h2 class="text-2xl my-4 text-center">Organisations</h2>
  <GroupedTeaserList :type="`organisations`">
    <template v-slot:longList>
      <OrganisationTeaser
        v-for="g in messageStore.organisations"
        :key="g.id"
        :item="g"
        :link="false"
        :show-checked="true"
      />
    </template>
    <template v-slot:shortList>
      <OrganisationTeaser
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