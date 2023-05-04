<script lang="ts" setup>
defineProps({
  url: {
    required: false,
    type: String,
    default: null
  }
})
</script>
<template>
  <router-link
    :to="url"
    class="bg-gradient-to-r from-c-db to-c-lb text-white text-lg text-center w-10/12 rounded-md py-3 shadow-gray-400 shadow-md my-2 hover:to-c-db"
  >
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped></style>
