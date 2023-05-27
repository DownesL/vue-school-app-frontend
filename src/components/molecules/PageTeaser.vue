<script lang="ts" setup></script>
<template>
  <section>
    <h2 class="text-2xl">
      <slot name="title" />
    </h2>
    <slot name="content" />
  </section>
</template>
<style lang="scss" scoped>
section {
  background: $dark;
  @include shadow-dark;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: $e auto;
  border-radius: 16px;
  padding: $d;
  width: min(55ch, 87%);
  height: fit-content;
}
</style>
