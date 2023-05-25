<script lang="ts" setup>
defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
<template>
  <button :disabled="disabled">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  @include text-lg;
  @include shadow-dark;
  text-align: center;
  width: 100%;
  padding-block: $c;
  margin: $b auto;
  color: $black;
  background: $purple-light;
  border-radius: $border-radius;
  transition: $transition;
  font-weight: 600;
  &:hover {
    background: $purple;
    //color: $white;
  }
  &[disabled] {
    background: $gray;
    cursor: not-allowed;
  }
}
</style>
