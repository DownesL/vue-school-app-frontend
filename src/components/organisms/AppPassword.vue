<script lang="ts" setup>
import AppLink from '@/components/atoms/AppLink.vue'
import AppButton from "@/App.vue";
</script>
<template>
  <h1 class="text-3xl">Set Password</h1>
  <form method="post" class="flex flex-col w-4/5 mx-auto gap-4 my-4" novalidate>
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
    <AppButton type="submit" class="mx-auto">Set Password</AppButton>
  </form>
</template>