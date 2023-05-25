<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref } from 'vue'
import AppTextArea from '@/components/atoms/AppTextArea.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { useGroupStore } from '@/stores/group'
import { useOrganisationStore } from '@/stores/organisation'

const props = defineProps({
  selected: {
    required: true,
    type: Object as PropType<Group | Organisation>
  },
  type: {
    required: true,
    type: String
  }
})
const motivation = ref<string>('')
const motivationError = ref<string>('')

const trySendJoinRequest = () => {
  motivationError.value = ''
  if (motivation.value.length < 15 || motivation.value.length > 200) {
    motivationError.value = 'Fill in a valid motivation (min: 15chars, max: 200chars)'
  } else {
    if (props.type?.match(/group/i)) {
      useGroupStore().joinRequest({ id: `${props.selected?.id}`, motivation: motivation.value })
    } else {
      useOrganisationStore().joinRequest({
        id: `${props.selected?.id}`,
        motivation: motivation.value
      })
    }
  }
}
</script>
<template>
  <form novalidate>
    <div class="flex flex-col mx-auto mt-2 mb-4">
      <AppTextArea v-model:value="motivation" :error="motivationError" name="motivation" />
      <AppButton class="w-full" type="submit" @click.prevent="trySendJoinRequest"
        >Send Request
      </AppButton>
    </div>
  </form>
</template>
