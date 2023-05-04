<script setup lang="ts">
import {useMessageStore} from "@/stores/message";
import {computed} from "vue";
import router from "@/router";

const messageStore = useMessageStore()

const m = computed(() => messageStore.messages.find(x => x.id === parseInt(router.currentRoute.value.params?.id as string)))
</script>
<template>
  <section>
    <h2>{{ m.group.organisation.name }}</h2>
    <h3>{{m.group.name}}</h3>
    <p>{{m.text}}</p>
  </section>
</template>