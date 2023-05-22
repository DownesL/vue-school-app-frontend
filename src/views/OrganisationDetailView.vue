<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import GroupedTeaser from '@/components/molecules/GroupedTeaser.vue'
import { useOrganisationStore } from '@/stores/organisation'
import AppLink from '@/components/atoms/AppLink.vue'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})
const organisationStore = useOrganisationStore()
organisationStore.getOrganInfo(props.id)
</script>
<template>
  <h1>{{ organisationStore.selectedOrgan?.name }}: Detail Page</h1>
  <PageTeaser>
    <template v-slot:title> {{ organisationStore.selectedOrgan?.name }}</template>
    <template v-slot:content>
      <p>{{ organisationStore.selectedOrgan?.description }}</p>
    </template>
  </PageTeaser>
  <PageTeaser>
    <template v-slot:title>Groups</template>
    <template v-slot:content>
      <ul class="w-full">
        <GroupedTeaser
          v-for="g in organisationStore.selectedOrgan?.groups"
          :key="g.id"
          :item="g"
          link="specificGroup"
        />
      </ul>
    </template>
  </PageTeaser>
  <PageTeaser>
    <template v-slot:title>Actions</template>
    <template v-slot:content>
      <AppLink :url="{ name: 'generalAdd', params: { type: 'messages' } }">Add a Message</AppLink>
      <AppLink :url="{ name: 'generalAdd', params: { type: 'groups' } }">Add a group</AppLink>
    </template>
  </PageTeaser>
</template>
<style lang="scss" scoped>
ul {
  padding: 0;
}

h1 {
  @include sr-only;
}

p {
  text-align: center;
  margin-block: 1rem;
}
</style>
