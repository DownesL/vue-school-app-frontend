<script lang="ts" setup>
defineProps({
  url: {
    required: true,
    type: String
  }
})
</script>
<template>
  <router-link
    :to="url"
    class="bg-gradient-to-r from-c-db to-c-lb text-white text-lg text-center w-10/12 rounded-md p-1 shadow-gray-400 shadow-md my-2"
  >
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped></style>
