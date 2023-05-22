<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { ref, watch } from 'vue'
import SearchFilter from '@/components/atoms/SearchFilter.vue'

defineProps({
  type: {
    required: true,
    type: String
  },
  selected: {
    required: false,
    type: Object || null
  },
  search: {
    required: true,
    type: String
  }
})
const emit = defineEmits(['update:search'])
const motivation = ref<string>('')
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
    <AppButton :disabled="!selected?.id" class="mx-auto" @click="() => (nexted = true)">
      Join {{ type }}
    </AppButton>
  </template>
  <PageTeaser v-if="nexted">
    <template v-slot:title> Join {{ selected?.name }}</template>
    <template v-slot:content>
      <button @click="() => (nexted = false)">X</button>
      <form method="post" novalidate>
        <div class="flex flex-col mx-auto mt-2 mb-4">
          <label for="motivation">Motivation</label>
          <p class="text-sm text-gray-700">Fill in your motivation, e.g.'Phil's parent'</p>
          <textarea
            id="motivation"
            v-model="motivation"
            class="px-3 py-2 border border-black border-opacity-40 rounded-md"
            cols="30"
            name="motivation"
            rows="5"
          />
          <AppButton class="w-full" type="submit">Send Request</AppButton>
        </div>
      </form>
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