<script lang="ts" setup>
import InputField from '@/components/atoms/InputField.vue'
import { computed, ref } from 'vue'
import AppButton from '@/components/atoms/AppButton.vue'
import AppTextArea from '@/components/atoms/AppTextArea.vue'
import { useOrganisationStore } from '@/stores/organisation'
import { useGroupStore } from '@/stores/group'
import AppConfirmation from '@/components/molecules/AppConfirmation.vue'
import router from '@/router'

const props = defineProps({
  type: {
    required: false,
    type: String,
    default: 'organisations'
  },
  id: {
    required: false,
    type: String,
    default: '-1'
  }
})
const title = computed(() => {
  return (props.type === 'organisations' ? 'an ' : 'a ') + props.type?.slice(0, -1)
})

const name = ref<string>('')
const nameError = ref<string>('')

const description = ref<string>('')
const descriptionError = ref<string>('')

const confirmation = ref<boolean>(false)

const validateGrouped = () => {
  nameError.value = ''
  descriptionError.value = ''
  if (!name.value.trim()) {
    nameError.value = 'Fill in a name.'
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Fill in a description.'
  }
  return !(nameError.value || descriptionError.value)
}
const askConfirmation = () => {
  confirmation.value = validateGrouped()
}
const organisationStore = useOrganisationStore()
const groupStore = useGroupStore()
if (parseInt(props.id) > 0) {
  organisationStore.getOrganInfo(props.id)
}

const tryCreateOrgan = async () => {
  if (!validateGrouped()) {
    confirmation.value = false
  }

  return await organisationStore.createOrgan({
    name: name.value,
    description: description.value
  })
}
const tryCreateGroup = async () => {
  if (!validateGrouped()) {
    confirmation.value = false
  }
  return await groupStore.createGroup({
    name: name.value,
    description: description.value,
    organisation_id: parseInt(props.id)
  })
}
const tryCreate = async (v: boolean) => {
  if (!v) {
    confirmation.value = false
    return
  }
  let msg = null
  switch (props.type) {
    case 'organisations': {
      msg = await tryCreateOrgan()
      if (msg?.id) {
        await router.push({ name: 'specificOrganisation', params: { id: msg.id } })
      }
      break
    }

    case 'groups': {
      msg = await tryCreateGroup()
      if (msg?.id) {
        await router.push({ name: 'specificGroup', params: { id: msg.id } })
      }
      break
    }
  }
  if (!msg?.id) {
    nameError.value = msg?.errors.name ? msg?.errors.name[0] : ''
    descriptionError.value = msg?.errors.description ? msg?.errors.description[0] : ''
    confirmation.value = false
  }
}
</script>
<template>
  <div v-if="!confirmation" class="container">
    <h1>Add {{ title }}</h1>
    <form method="post" novalidate>
      <InputField v-model:value="name" :error="nameError" name="name" type="text" />
      <AppTextArea v-model:value="description" :error="descriptionError" name="description" />
      <AppButton @click.prevent="askConfirmation">Create {{ type.slice(0, -1) }}</AppButton>
    </form>
  </div>
  <AppConfirmation v-else :name="name" :type="type.slice(0, -1)" @clicked="tryCreate" />
</template>
<style lang="scss" scoped>
div.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(75ch, 87%);

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .error {
      border-color: $red;
      outline-color: red;
    }

    span.error {
      color: red;
      padding-left: $b;
    }

    fieldset {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      width: fit-content;
      padding: 1rem 1.4rem 1.4rem;
      gap: 1rem;
      border-radius: $border-radius;

      label {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      input {
        padding-left: 0.5rem;
      }
    }

    div {
      width: 100%;
    }
  }
}
</style>
