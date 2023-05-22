<script lang="ts" setup>
defineProps({
  url: {
    required: false,
    type: Object,
    default: null
  }
})
</script>
<template>
  <router-link :to="url">
    <slot></slot>
  </router-link>
</template>

<style lang="scss" scoped>
a {
  @include text-lg;
  @include shadow-dark;
  text-decoration: none;
  text-align: center;
  width: 100%;
  padding-block: $c;
  margin-block: $b;
  color: $black;
  background: $purple-light;
  border-radius: $border-radius;
  transition: $transition;
  &:hover {
    background: $purple;
    color: $black;
  }
}
</style>