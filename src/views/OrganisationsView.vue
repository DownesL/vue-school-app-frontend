<script lang="ts" setup>
import { computed } from 'vue'
import GroupedTeaserList from '@/components/organisms/GroupedTeaserList.vue'
import GroupedTeaser from '@/components/molecules/GroupedTeaser.vue'
import { useOrganisationStore } from '@/stores/organisation'

const organisationStore = useOrganisationStore()
organisationStore.getAllOrgans()
organisationStore.getUserOrgans()
organisationStore.getNonUserOrgans()
const filteredGroups = computed(() =>
  organisationStore.nonUserOrgans?.filter((x: Organisation) =>
    x.name.match(new RegExp(`.*${organisationStore.search}.*`, 'i'))
  )
)
</script>
<template>
  <h1 class="text-2xl my-4 text-center">Join Organisation</h1>
  <GroupedTeaserList
    v-model:search="organisationStore.search"
    :selected="organisationStore.selectedOrgan"
    type="Organisation"
  >
    <template v-slot:longList>
      <GroupedTeaser
        v-for="g in organisationStore.userOrgans"
        :key="g.id"
        :is-joined="true"
        :item="g"
        :show-checked="true"
      />
    </template>
    <template v-slot:shortList>
      <GroupedTeaser
        v-for="g in filteredGroups"
        :key="g.id"
        :item="g"
        :show-checked="true"
        @click="() => (organisationStore.selectedOrgan = g)"
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
