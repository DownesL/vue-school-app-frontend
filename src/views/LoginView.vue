<script lang="ts" setup></script>
<template>
  <section>
    <RouterView />
  </section>
</template>

<style lang="scss" scoped>
header {
  transition: all 350ms ease-in-out;
}
section {
  @include shadow-dark;
  background: $background;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  border-radius: $b;
  padding-block: $h;
  margin: $g auto;
  position: relative;
}
</style>
