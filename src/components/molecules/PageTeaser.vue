<script lang="ts" setup>
</script>
<template>
  <section class="shadow-light flex flex-col justify-center items-center my-5 mx-auto w-10/12 rounded-lg p-4">
    <h2 class="text-2xl">
      <slot name="title" />
    </h2>
    <slot name="content"/>
  </section>
</template>
