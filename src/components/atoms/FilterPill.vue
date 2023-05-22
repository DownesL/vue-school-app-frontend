<script lang="ts" setup>
defineProps({
  filter: {
    required: true,
    type: String
  }
})
</script>
<template>
  <button :title="`Remove ${filter}`">
    <span>
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
        fill="currentcolor"
      />
    </svg>
  </button>
</template>
<style lang="scss" scoped>
button {
  @include text-sm;
  background: $purple-light;
  color: $black;
  padding: $a $c;
  border-radius: $border-radius;
  display: flex;
  align-items: center;
  gap: $b;
  overflow: hidden;

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 5rem;
    overflow: hidden;
  }
}
</style>
