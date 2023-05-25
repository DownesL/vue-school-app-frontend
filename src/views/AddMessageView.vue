<script lang="ts" setup>
import InputField from '@/components/atoms/InputField.vue'
import { ref } from 'vue'

const name = ref<string>('')
const nameError = ref<string>('')
const description = ref<string>('')
const descriptionError = ref<string>('')
</script>
<template>
  <h1>Add a Message</h1>
  <InputField :error="nameError" :value="name" name="name" type="text" />
  <InputField :error="descriptionError" :value="description" name="name" type="text" />
</template>
