<script setup lang="ts">
defineProps({
  group: {
    required: true,
    type: Object
  }
})
</script>
<template>
  <span>{{ group.alias ? group.alias : `${group.name} • ${group.organisation.name}` }}</span>
</template>