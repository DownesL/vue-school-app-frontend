<script lang="ts" setup>
import LargeButton from '@/components/atoms/AppButton.vue'
</script>
<template>
  <section
      class="shadow-light flex flex-col justify-center items-center w-10/12 rounded-lg pt-8 pb-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <h1 class="text-3xl">Set Password</h1>
    <form action="" class="flex flex-col w-4/5 mx-auto gap-4 my-4">
      <label class="sr-only" for="password">Password</label>
      <input
          id="password"
          class="bg-c-gr border-2 rounded-lg px-3 py-2"
          name="password"
          placeholder="password"
          type="password"
      />
      <label class="sr-only" for="confirmPassword">Confirm Password</label>
      <input
          id="confirmPassword"
          class="bg-c-gr border-2 rounded-lg px-3 py-2"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
      />
    </form>
    <LargeButton :url="'/'" class="mx-auto">Set Password</LargeButton>
  </section>
</template>