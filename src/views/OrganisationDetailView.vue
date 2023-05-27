<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import GroupedTeaser from '@/components/molecules/GroupedTeaser.vue'
import { useOrganisationStore } from '@/stores/organisation'
import AppLink from '@/components/atoms/AppLink.vue'
import MembersTab from '@/views/MembersTab.vue'
import JoinRequestTab from '@/views/JoinRequestTab.vue'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})
const organisationStore = useOrganisationStore()
organisationStore.getOrganInfo(props.id)
const updateSelected = (v: Organisation) => {
  organisationStore.selectedOrgan = v
}
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
      <ul v-if="organisationStore.selectedOrgan?.groups" class="w-full">
        <GroupedTeaser
          v-for="g in organisationStore.selectedOrgan?.groups"
          :key="g.id"
          :item="g"
          link="specificGroup"
        />
      </ul>
      <p v-else>This Organisation doen't have any groups yet.</p>
    </template>
  </PageTeaser>
  <MembersTab
    v-if="organisationStore.selectedOrgan?.admins"
    :members="organisationStore.selectedOrgan?.admins as User[]"
  />
  <JoinRequestTab
    v-if="organisationStore.selectedOrgan?.join_requests"
    :join-requests="organisationStore.selectedOrgan?.join_requests as JoinRequest[]"
    @updateSelected="updateSelected"
  />
  <PageTeaser>
    <template v-slot:title>Actions</template>
    <template v-slot:content>
      <AppLink :url="{ name: 'msgsAdd' }">Add a Message</AppLink>
      <AppLink :url="{ name: 'groupsAdd', params: { type: 'groups' } }">Add a group</AppLink>
    </template>
  </PageTeaser>
</template>
<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
}

li {
  display: inline-flex;
  background: $background;
  color: $text;
  text-align: center;
  width: 100%;
  position: relative;
  align-items: center;
  border-bottom: $purple;
  flex-grow: 0;
  overflow: hidden;
  border-radius: $border-radius;
  transition: $transition;
  padding: $c $d;
  justify-content: center;

  &:not(:last-of-type) {
    border-radius: $border-radius $border-radius 0 0;
    border-bottom: 2px solid $purple;
  }
}

h1 {
  @include sr-only;
}

p {
  text-align: center;
  margin-block: 1rem;
}
</style>
