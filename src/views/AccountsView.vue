<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import {useMessageStore} from '@/stores/message'
import LargeButton from '@/components/atoms/LargeButton.vue'
import GroupTeaser from '@/components/molecules/GroupTeaser.vue'
import OrganisationTeaser from "@/components/molecules/OrganisationTeaser.vue";

const messageStore = useMessageStore()
</script>
<template>
  <PageTeaser>
    <template v-slot:title>My Groups</template>
    <template v-if="!messageStore.organisations.length" v-slot:content>
      <p v-if="!messageStore.groups.length" class="text-center my-2">
        Seems like you don’t belong to a group yet!
      </p>
      <p v-if="!messageStore.groups.length" class="text-center my-2">
        A group is where you can find information.
      </p>
    </template>
    <template v-else v-slot:content>
    <ul class="w-full">
      <GroupTeaser v-for="g in messageStore.groups" :key="g.id" :item="g"/>
    </ul>
    <LargeButton :url="'organisations/add'">Add a group</LargeButton>
  </template>
  </PageTeaser>

  <PageTeaser>
    <template v-slot:title>My Organisations</template>
    <template v-if="!messageStore.organisations.length" v-slot:content>
      <p class="text-center mt-2 mb-1">Seems like you don’t belong to an organisation yet!</p>
      <p class="text-center mb-2">
        An organisation is where you can register groups and send out information.
      </p>
    </template>
    <template v-else v-slot:content>
      <ul class="w-full">
        <OrganisationTeaser v-for="(g,id) in messageStore.organisations" :key="id" :item="g"/>
      </ul>
    </template>
  </PageTeaser>

  <PageTeaser>
    <template v-slot:title>I want to...</template>
    <template v-slot:content>
      <LargeButton :url="'groups/'">Join a group</LargeButton>
      <LargeButton :url="'organisations/'">Join an organisation</LargeButton>
      <LargeButton :url="'organisations/add'">Add an organisation</LargeButton>
    </template>
  </PageTeaser>
</template>