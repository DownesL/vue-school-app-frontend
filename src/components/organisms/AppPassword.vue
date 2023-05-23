<script lang="ts" setup>
import AppButton from '@/App.vue'
</script>
<template>
  <h1 class="text-3xl">Set Password</h1>
  <form class="flex flex-col w-4/5 mx-auto gap-4 my-4" method="post" novalidate>
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
    <AppButton class="mx-auto" type="submit">Set Password</AppButton>
  </form>
</template>
