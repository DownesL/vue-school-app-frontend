<script setup lang="ts">
defineProps({
  flagged: {
    required: true,
    type: Number
  }
})
</script>
<template>
  <button>
    <span>{{ flagged ? 'Unflag' : 'Flag' }} this message</span>
    <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.8194 7.19614L15.9802 8.00002H16.8H22.3333V17.6667H15.9865L15.6806 16.1372L15.5198 15.3334H14.7H8.16668H7.16668V16.3334V23.5H6.83334V5.66669H15.5135L15.8194 7.19614Z"
        stroke="#A489E1"
        stroke-width="2"
      />
      <path
        d="M15.8194 7.19614L15.9802 8.00002H16.8H22.3333V17.6667H15.9865L15.6806 16.1372L15.5198 15.3334H14.7H8.16668H7.16668V16.3334V23.5H6.83334V5.66669H15.5135L15.8194 7.19614Z"
        stroke="#A489E1"
        stroke-width="2"
        :fill="flagged ? '#A489E1' : 'transparent'"
      />
    </svg>
  </button>
</template>
<style lang="scss" scoped>
span {
  @include sr-only;
}
</style>
