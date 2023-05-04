<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  },
  error: {
    required: false,
    type: Boolean,
    default: false
  },
  value: {
    required: true,
    type: String || null
  }
})
const newVal = ref<null | string>(null)
const emit = defineEmits(['update:value'])
const label = computed(() => props.name.replace(/(?=[A-Z])/, ' '))
const handleChange = () => emit('update:value', newVal.value)
</script>
<template>
  <label :for="name" class="sr-only">{{ label }}</label>
  <input
    :id="name"
    v-model="newVal"
    :class="{ 'border-red-500': error, 'outline-red-500': error }"
    :name="name"
    :placeholder="label"
    :type="type"
    :value="value"
    class="border border-black border-opacity-40 rounded-md px-3 py-2 capitalize"
    @input="handleChange"
  />
</template>
