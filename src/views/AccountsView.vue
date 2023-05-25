<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import AppLink from '@/components/atoms/AppLink.vue'
import GroupedTeaser from '@/components/molecules/GroupedTeaser.vue'
import { useGroupStore } from '@/stores/group'
import { useAuthStore } from '@/stores/auth'
import { useOrganisationStore } from '@/stores/organisation'
import AppButton from '@/components/atoms/AppButton.vue'

const groupStore = useGroupStore()
const authStore = useAuthStore()
const organStore = useOrganisationStore()

authStore.initUser()
groupStore.getUserGroups()
organStore.getUserOrgans()
</script>
<template>
  <h1 class="sr-only">Account</h1>
  <PageTeaser>
    <template v-slot:title>
      {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
    </template>
    <template v-slot:content>
      <p>{{ authStore.user?.email }}</p>
    </template>
  </PageTeaser>
  <PageTeaser>
    <template v-slot:title>My Groups</template>
    <template v-if="!groupStore.userGroups?.length" v-slot:content>
      <p>Seems like you don’t belong to a group yet!</p>
      <p>A group is where you can find information.</p>
    </template>
    <template v-else v-slot:content>
      <ul class="full-w">
        <GroupedTeaser
          v-for="g in groupStore.userGroups"
          :key="g.id"
          :item="g"
          link="specificGroup"
        />
      </ul>
    </template>
  </PageTeaser>

  <PageTeaser>
    <template v-slot:title>My Organisations</template>
    <template v-if="!organStore.userOrgans?.length" v-slot:content>
      <p>Seems like you don’t belong to or own an organisation yet!</p>
      <p>An organisation is where you can register groups and send out information.</p>
    </template>
    <template v-else v-slot:content>
      <ul class="full-w">
        <GroupedTeaser
          v-for="o in organStore.userOrgans"
          :key="o.id"
          :item="o"
          link="specificOrganisation"
        />
      </ul>
    </template>
  </PageTeaser>

  <PageTeaser>
    <template v-slot:title>I want to...</template>
    <template v-slot:content>
      <AppLink :url="{ name: 'groups' }">Join a group</AppLink>
      <AppLink :url="{ name: 'organisations' }">Join an organisation</AppLink>
      <AppLink :url="{ name: 'addOrganisation' }">Add an organisation</AppLink>
    </template>
  </PageTeaser>
  <AppButton @click="authStore.logout()">Log Out</AppButton>
</template>
<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
}
p {
  text-align: center;
  margin-block: $d;
  &:first-of-type {
    margin-bottom: $b;
  }
  &:nth-of-type(2) {
    margin-top: $b;
  }
}
</style>
