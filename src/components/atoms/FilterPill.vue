<script lang="ts" setup>
defineProps({
  filter: {
    required: true,
    type: String
  }
})
</script>
<template>
  <button
    class="text-sm bg-gradient-to-r from-c-db to-c-lb text-white px-3 py-1 rounded-md flex items-center gap-2 overflow-hidden"
    :title="`Remove ${filter}`"
  >
    <span class="whitespace-nowrap overflow-ellipsis max-w-filter-pill overflow-hidden">
      {{ filter }}
    </span>

    <svg
      v-if="filter !== 'All Groups'"
      fill="none"
      height="11"
      viewBox="0 0 14 14"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
        fill="white"
      />
    </svg>
  </button>
</template>
