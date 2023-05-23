<script lang="ts" setup>
import InputField from '@/components/atoms/InputField.vue'
import { computed, reactive, ref } from 'vue'
import AppButton from '@/components/atoms/AppButton.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import AppTextArea from '@/components/atoms/AppTextArea.vue'
import { useOrganisationStore } from '@/stores/organisation'
import router from '@/router'
import { useGroupStore } from '@/stores/group'

import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ToggleInput from '@/components/atoms/ToggleInput.vue'
import { useMessageStore } from '@/stores/message'

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

const important = ref<boolean>(false)

const groups = ref<string[]>([])
const groupsError = ref<string>('')

const message = ref('')
const message_file = ref<File>()
const messageError = ref('')

const confirmation = ref<boolean>(false)
const fileUpload = ref(false)

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
const validateMessage = () => {
  if (!groups.value.length) {
    groupsError.value = 'Select at least one group'
  }
  if (!message.value && !message_file.value) {
    messageError.value = 'Upload or write a message'
  }
  const o = validateGrouped()
  return !(nameError.value || descriptionError.value) && o
}
const askConfirmation = () => {
  if (props.type === 'messages') {
    confirmation.value = validateMessage()
  } else {
    confirmation.value = validateGrouped()
  }
}
const organisationStore = useOrganisationStore()
const messageStore = useMessageStore()
const groupStore = useGroupStore()
if (props.type === 'messages') {
  organisationStore.getOrganInfo(props.id)
}

const tryCreateOrgan = async () => {
  if (!validateGrouped()) {
    confirmation.value = false
  }

  const msg = await organisationStore.createOrgan({
    name: name.value,
    description: description.value
  })
  if (msg?.id) {
    router.push({ name: 'specificOrganisation', params: { id: msg.id } })
  } else {
    nameError.value = msg.errors.name ? msg.errors.name[0] : ''
    descriptionError.value = msg.errors.description ? msg.errors.description[0] : ''
    confirmation.value = false
  }
}
const tryCreateGroup = async () => {
  if (!validateGrouped()) {
    confirmation.value = false
  }
  const msg = await groupStore.createGroup({
    name: name.value,
    description: description.value,
    organisation_id: parseInt(props.id)
  })
  if (msg?.id) {
    //router.push({ name: 'specificGroup', params: { id: msg.id } })
  } else {
    nameError.value = msg.errors.name ? msg.errors.name[0] : ''
    descriptionError.value = msg.errors.description ? msg.errors.description[0] : ''
    confirmation.value = false
  }
}

const tryCreateMessages = async () => {
  if (!validateMessage()) {
    confirmation.value = false
  }
  const msg = await messageStore.createMessage({
    name: name.value,
    description: description.value,
    important: important.value,
    groups: groups.value,
    content: message.value,
    file_message: message_file.value ?? null,
    id: parseInt(props.id)
  })
  if (msg?.id) {
    router.push({ name: 'specificOrganisation', params: { id: msg.id } })
  } else {
    nameError.value = msg.errors.name ? msg.errors.name[0] : ''
    descriptionError.value = msg.errors.description ? msg.errors.description[0] : ''
    messageError.value = msg.errors.message ? msg.errors.message[0] : ''
    messageError.value = msg.errors.message_file ? msg.errors.message_file[0] : ''
    groupsError.value = msg.errors.groups ? msg.errors.groups[0] : ''
    confirmation.value = false
  }

}
const tryCreate = () => {
  switch (props.type) {
    case 'organisations':
      tryCreateOrgan()
      break
    case 'groups':
      tryCreateGroup()
      break
    case 'messages':
      tryCreateMessages()
      break
  }
}

// State


const config = reactive({
  toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline', '|']
})
</script>
<template>
  <div v-if="!confirmation" class="container">
    <h1>Add {{ title }}</h1>
    <form method="post" novalidate>
      <InputField v-model:value="name" :error="nameError" name="name" type="text" />
      <AppTextArea v-model:value="description" :error="descriptionError" name="description" />
      <template v-if="type === 'messages'">
        <ToggleInput v-model:value="important" name="important" />
        <fieldset :class="{ error: groupsError.length }">
          <legend>
            Groups <span class="error" role="alert">{{ groupsError }}</span>
          </legend>
          <label v-for="g in organisationStore.selectedOrgan?.groups" :key="g.id" :title="g.name">
            <input :id="g.id" v-model="groups" :value="g.name" name="group" type="checkbox" />
            {{ g.name }}
          </label>
        </fieldset>
        <ToggleInput v-model:value="fileUpload" name="uploadFile" />
        <div v-if="!fileUpload">
          <label for="editor"
            >Message <span class="error" role="alert">{{ messageError }}</span></label
          >
          <ckeditor
            id="editor"
            v-model="message"
            :config="config"
            :editor="ClassicEditor"
            style="color: black"
            tag-name="textarea"
          />
        </div>
        <InputField v-else :error="messageError" :value="message_file" name="message" type="file" />
      </template>
      <AppButton @click.prevent="askConfirmation">Create {{ type.slice(0, -1) }}</AppButton>
    </form>
  </div>
  <PageTeaser v-else>
    <template v-slot:title> Are you sure?</template>
    <template v-slot:content>
      <p>The {{ type.slice(0, -1) }} '{{ name }}' will be created.</p>
      <AppButton @click="() => (confirmation = false)">Cancel</AppButton>
      <AppButton @click="tryCreate">Approve</AppButton>
    </template>
  </PageTeaser>
</template>
<style lang="scss" scoped>
div.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 87%;

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
