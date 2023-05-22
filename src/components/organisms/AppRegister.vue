<script lang="ts" setup>
import {ref, watch} from 'vue'
import InputField from '@/components/atoms/InputField.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import {useAuthStore} from '@/stores/auth'

const email = ref<string>('')
const emailConf = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const isSameEmail = ref<string>('')

interface RegisterObj {
  first_name?: string
  last_name?: string
  email?: string
}

const registerError = ref<RegisterObj>()
const errors = ref<RegisterObj>()
watch(
    emailConf,
    () =>
        (isSameEmail.value =
            emailConf.value?.length && email.value?.trim() === emailConf.value?.trim()
                ? ''
                : `Emails don't match`)
)
const authStore = useAuthStore()
const thankYouMsg = ref<boolean>(false)

const register = async () => {
  registerError.value = await authStore.register({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value
  })
  if (!registerError.value) {
    thankYouMsg.value = true
  }
}
watch(registerError, (nVal) => {
  let err: RegisterObj = {}
  if (nVal?.first_name) {
    err['first_name'] = nVal.first_name[0]
  }
  if (nVal?.last_name) {
    err['last_name'] = nVal.last_name[0]
  }
  if (nVal?.email) {
    err['email'] = nVal.email[0]
  }
  errors.value = err
})
</script>
<template>
  <template v-if="!thankYouMsg">
    <h1 class="text-3xl">Register</h1>
    <form method="post" class="flex flex-col w-4/5 mx-auto gap-4 my-4" novalidate>
      <InputField
          v-model:value="firstName"
          :error="errors?.first_name"
          name="firstName"
          type="text"
      />
      <InputField v-model:value="lastName" :error="errors?.last_name" name="lastName" type="text"/>
      <InputField v-model:value="email" :error="errors?.email" name="email" type="email"/>
      <InputField
          v-model:value.lazy="emailConf"
          :error="isSameEmail ? isSameEmail : errors?.email"
          name="emailConfirm"
          type="email"
      />
      <AppButton class="mx-auto" @click.prevent="register">Register</AppButton>
    </form>
  </template>
  <template v-else>
    <h1>Thank you {{ firstName }}! Verify!</h1>
    <p>You need to verify your email before you'll be able to use your account</p>
  </template>
</template>