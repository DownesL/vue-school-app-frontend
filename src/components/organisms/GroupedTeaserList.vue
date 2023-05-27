<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'
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
    <div>
      <ul>
        <slot name="longList" />
        <slot name="shortList" />
      </ul>
      <AppButton
        :aria-expanded="nexted"
        :disabled="!selected?.id"
        aria-controls="joinForm"
        class="mx-auto"
        @click="() => (nexted = true)"
      >
        Join {{ type }}
      </AppButton>
    </div>
  </template>
  <PageTeaser v-if="nexted && selected" id="joinForm">
    <template v-slot:title> Join {{ selected.name }}</template>
    <template v-slot:content>
      <button
        :aria-expanded="nexted"
        aria-controls="#joinForm"
        class="close-btn"
        @click="() => (nexted = false)"
      >
        <svg
            fill="none"
            height="16"
            viewBox="0 0 22 22"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
        >
          <title>Close</title>
          <path
              d="M13.2943 11L22 19.7057V22H19.7057L11 13.2943L2.29429 22H0V19.7057L8.70571 11L0 2.29429V0H2.29429L11 8.70571L19.7057 0H22V2.29429L13.2943 11Z"
              fill="currentColor"
          />
        </svg>
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
}
#joinForm {
   position: relative;
 }
.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: $white;
}

div:not(.search-filter) {
  width: min(75ch, 87%);
}

li {
  list-style: none;
  width: 100%;
}
</style>
