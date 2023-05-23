<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { PropType, ref, watch } from 'vue'
import SearchFilter from '@/components/atoms/SearchFilter.vue'
import JoinForm from '@/components/molecules/JoinForm.vue'

defineProps({
  type: {
    required: true,
    type: String
  },
  selected: {
    required: false,
    type: Object as PropType<Group | Organisation>
  },
  search: {
    required: true,
    type: String
  }
})
const emit = defineEmits(['update:search'])
const nexted = ref<boolean>(false)
const searchValue = ref<string>('')
watch(searchValue, () => {
  emit('update:search', searchValue.value)
})
</script>
<template>
  <template v-if="!nexted">
    <SearchFilter v-model:search="searchValue" />
    <ul>
      <slot name="longList" />
      <slot name="shortList" />
    </ul>
    <AppButton
      :aria-expanded="nexted"
      :disabled="!selected?.id"
      aria-controls="#joinForm"
      class="mx-auto"
      @click="() => (nexted = true)"
    >
      Join {{ type }}
    </AppButton>
  </template>
  <PageTeaser v-if="nexted && selected" id="#joinForm">
    <template v-slot:title> Join {{ selected.name }}</template>
    <template v-slot:content>
      <button
        :aria-expanded="nexted"
        aria-controls="#joinForm"
        class="close-btn"
        @click="() => (nexted = false)"
      >
        X
      </button>
      <JoinForm :selected="selected" :type="type" />
    </template>
  </PageTeaser>
</template>
<style lang="scss" scoped>
ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 87%;
}

button {
  width: 87%;
}
</style>
