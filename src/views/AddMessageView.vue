<script lang="ts" setup>
import { reactive, ref } from 'vue'
import ToggleInput from '@/components/atoms/ToggleInput.vue'
import router from '@/router'
import { useMessageStore } from '@/stores/message'
import { useOrganisationStore } from '@/stores/organisation'
import InputField from '@/components/atoms/InputField.vue'
import AppTextArea from '@/components/atoms/AppTextArea.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import AppConfirmation from '@/components/molecules/AppConfirmation.vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})

const name = ref<string>('')
const nameError = ref<string>('')

const description = ref<string>('')
const descriptionError = ref<string>('')

const confirmation = ref<boolean>(false)

const groups = ref<string[]>([])
const groupsError = ref<string>('')

const message = ref('')
const filename = ref<any>()
const messageError = ref('')

const important = ref<boolean>(false)
const fileUpload = ref(false)
const config = reactive({
  toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', '|']
})
const messageStore = useMessageStore()
const organisationStore = useOrganisationStore()
organisationStore.getOrganInfo(props.id)

const validateMessage = () => {
  messageError.value = ''
  descriptionError.value = ''
  nameError.value = ''
  descriptionError.value = ''
  if (!groups.value.length) {
    groupsError.value = 'Select at least one group'
  }
  if (!message.value && !filename.value) {
    messageError.value = 'Upload or write a message'
  }
  if (filename.value && filename.value.type !== 'application/pdf') {
    messageError.value = 'Upload the message as a pdf'
  }
  console.log(filename.value)
  nameError.value = ''
  descriptionError.value = ''
  if (!name.value.trim()) {
    nameError.value = 'Fill in a name.'
  }
  if (!description.value.trim()) {
    descriptionError.value = 'Fill in a description.'
  }
  return !(
    messageError.value ||
    descriptionError.value ||
    nameError.value ||
    descriptionError.value
  )
}

const tryCreateMessages = async (v: Boolean) => {
  if (!validateMessage() || !v) {
    confirmation.value = false
    return
  }
  const msg = await messageStore.createMessage({
    name: name.value,
    description: description.value,
    important: important.value,
    groups: groups.value,
    content: message.value ? message.value.replace('pre', 'strong') : '',
    filename: filename.value ?? null,
    id: parseInt(props.id)
  })
  if (msg?.id) {
    await router.push({ name: 'specificOrganisation', params: { id: msg.id } })
  } else {
    nameError.value = msg.errors.name ? msg.errors.name[0] : ''
    descriptionError.value = msg.errors.description ? msg.errors.description[0] : ''
    messageError.value = msg.errors.message ? msg.errors.message[0] : ''
    messageError.value = msg.errors.filename ? msg.errors.filename[0] : ''
    groupsError.value = msg.errors.groups ? msg.errors.groups[0] : ''
    confirmation.value = false
  }
}
const askConfirmation = () => {
  confirmation.value = validateMessage()
}
const uploadFile = (e: any) => {
  const files = (e.target as HTMLInputElement).files
  if (files) {
    filename.value = files[0]
  }
}
</script>
<template>
  <div v-if="!confirmation" class="container">
    <h1>Add Message</h1>
    <form novalidate>
      <InputField v-model:value="name" :error="nameError" name="name" type="text" />
      <AppTextArea v-model:value="description" :error="descriptionError" name="description" />
      <ToggleInput
        v-model:value="important"
        name="important"
        @input="$emit('update:important', ($event.target as HTMLInputElement).value)"
      />
      <fieldset :class="{ error: groupsError.length }">
        <legend>
          Groups <span class="error" role="alert">{{ groupsError }}</span>
        </legend>
        <label v-for="g in organisationStore.selectedOrgan?.groups" :key="g.id" :title="g.name">
          <input :id="g.name" v-model="groups" :value="g.name" name="group" type="checkbox" />
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
          style="color: black; height: 16rem"
          tag-name="textarea"
        />
      </div>
      <div v-else class="fileInput">
        <label :for="name">
          <span>Message</span> <span class="error" role="alert">{{ messageError }}</span>
        </label>
        <input
          :id="name"
          :class="{ error: messageError }"
          :name="name"
          accept="application/pdf"
          autocomplete="false"
          required
          type="file"
          @change="uploadFile"
        />
      </div>
      <AppButton @click.prevent="askConfirmation">Create Message</AppButton>
    </form>
  </div>
  <AppConfirmation v-else :name="name" type="message" @clicked="tryCreateMessages" />
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

    button {
      margin-bottom: 4rem;
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

.fileInput {
  display: flex;
  flex-direction: column;

  label {
    span:first-of-type {
      text-transform: capitalize;
      color: $text;
    }
  }

  input {
    border: solid 1px $input-border;
    border-radius: $border-radius;
    padding: $b $c;
    background: $background;
    color: $text;

    &.error {
      border-color: $red;
      outline-color: red;
    }
  }
}
</style>
