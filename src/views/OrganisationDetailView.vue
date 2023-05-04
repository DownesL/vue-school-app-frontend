<script setup lang="ts">
import PageTeaser from "@/components/molecules/PageTeaser.vue";
import GroupTeaser from "@/components/molecules/GroupTeaser.vue";
import {useMessageStore} from "@/stores/message";
const messageStore = useMessageStore()
</script>
<template>
  <PageTeaser>
    <template v-slot:title>
      [Organisation Name]
    </template>
    <template v-slot:content>
      <p>description</p>
    </template>
  </PageTeaser>
  <PageTeaser>
    <template v-slot:title>
      Groups
    </template>
    <template v-slot:content>
      <ul class="w-full">
        <GroupTeaser v-for="g in messageStore.groups" :key="g.id" :item="g"/>
      </ul>
    </template>
  </PageTeaser>
</template>