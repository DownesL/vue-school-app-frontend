<script lang="ts" setup>
import LargeButton from '@/components/atoms/AppButton.vue'
import { ref, watch } from 'vue'
import InputField from '@/views/InputField.vue'

const email = ref<string>('')
const emailConf = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const isSameEmail = ref<Boolean>(true)
watch(
  emailConf,
  () =>
    (isSameEmail.value = emailConf.value?.length
      ? email.value?.trim() === emailConf.value?.trim()
      : true)
)
</script>
<template>
  <section
    class="shadow-light flex flex-col justify-center items-center w-10/12 rounded-lg pt-8 pb-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <h1 class="text-3xl">Register</h1>
    <form action="" class="flex flex-col w-4/5 mx-auto gap-4 my-4">
      <InputField v-model:value="firstName" name="firstName" type="text" />
      <InputField v-model:value="lastName" name="lastName" type="text" />
      <InputField v-model:value="email" name="email" type="email" />
      <InputField v-model:value="emailConf" :error="!isSameEmail" name="emailConfirm" type="email" />
    </form>
    <LargeButton :url="'/'" class="mx-auto">Register</LargeButton>
  </section>
</template>