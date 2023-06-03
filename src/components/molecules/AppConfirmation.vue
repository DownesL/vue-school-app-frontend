<script lang="ts" setup>
import AppButton from '@/components/atoms/AppButton.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'

defineProps({
  name: {
    required: true,
    type: String
  },
  type: {
    required: true,
    type: String
  }
})
const emit = defineEmits(['clicked'])
const handleClick = (v: boolean) => {
  emit('clicked', v)
}
</script>
<template>
  <PageTeaser>
    <template v-slot:title> Are you sure?</template>
    <template v-slot:content>
      <p>The {{ type }} '{{ name }}' will be created.</p>
      <AppButton @click="handleClick(false)">Cancel</AppButton>
      <AppButton @click="handleClick(true)">Approve</AppButton>
    </template>
  </PageTeaser>
</template>
