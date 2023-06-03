<script lang="ts" setup>
import { ref, watch } from 'vue'
import InputField from '@/components/atoms/InputField.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { useAuthStore } from '@/stores/auth'

const email = ref<string>('')
const emailConf = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const password = ref<string>('')
const passwordConf = ref<string>('')
const isSamePassword = ref<string>('')

interface RegisterObj {
  first_name?: string
  last_name?: string
  email?: string
  password?: string
}

const registerError = ref<RegisterObj>({})
const errors = ref<RegisterObj>({})

watch(emailConf, () => validateEmail())

watch(passwordConf, () => validatePassword())

const authStore = useAuthStore()
const thankYouMsg = ref<boolean>(false)

const register = async () => {
  errors.value = {}

  if (!firstName.value.trim()) {
    errors.value.first_name = 'Fill in a first name'
  }
  if (!lastName.value.trim()) {
    errors.value.last_name = 'Fill in a last name'
  }
  validateEmail()
  validatePassword()
  if (
    !(
      errors.value?.password ||
      errors.value?.email ||
      errors.value?.first_name ||
      errors.value?.last_name
    )
  ) {
    registerError.value = await authStore.register({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value
    })
    if (!registerError.value) {
      thankYouMsg.value = true
    } else {
      setErrors()
    }
  }
}
const validateEmail = () => {
  if (!(email.value.trim() && emailConf.value.trim())) {
    errors.value.email = 'Fill in an email address'
  } else if (!email.value.match(/[\w-.]+@[a-z]{0,8}\.[a-z]{2,3}/)) {
    errors.value.email = 'Email should be of format: example@mail.com'
  } else if (email.value !== emailConf.value) {
    errors.value.email = 'Emails do not match'
  } else {
    errors.value.email = ''
  }
}
const validatePassword = () => {
  if (!(password.value.trim() && passwordConf.value.trim())) {
    errors.value.password = 'Fill in a password'
  } else if (password.value !== passwordConf.value) {
    errors.value.password = 'Passwords do not match'
  } else {
    errors.value.password = ''
  }
}
const setErrors = () => {
  let err: RegisterObj = {}
  if (registerError.value.first_name) {
    err['first_name'] = registerError.value.first_name[0]
  }
  if (registerError.value.last_name) {
    err['last_name'] = registerError.value.last_name[0]
  }
  if (registerError.value.email) {
    err['email'] = registerError.value.email[0]
  }
  if (registerError.value.password) {
    err['password'] = registerError.value.password[0]
  }
  errors.value = err
}
</script>
<template>
  <template v-if="!thankYouMsg">
    <h1>Register</h1>
    <form novalidate>
      <InputField
        v-model:value="firstName"
        :error="errors?.first_name ?? ''"
        name="firstName"
        type="text"
      />
      <InputField
        v-model:value="lastName"
        :error="errors?.last_name ?? ''"
        name="lastName"
        type="text"
      />
      <InputField v-model:value="email" :error="errors?.email ?? ''" name="email" type="email" />
      <InputField
        v-model:value.lazy="emailConf"
        :error="errors?.email ?? ''"
        name="emailConfirm"
        type="email"
      />
      <InputField
        v-model:value="password"
        :error="errors?.password ?? ''"
        name="password"
        type="password"
      />
      <InputField
        v-model:value.lazy="passwordConf"
        :error="isSamePassword ? isSamePassword : errors?.password ?? ''"
        name="passwordConfirm"
        type="password"
      />
      <AppButton class="mx-auto" @click.prevent="register">Register</AppButton>
    </form>
  </template>
  <template v-else>
    <h1>Thank you {{ firstName }}!</h1>
  </template>
</template>
<style lang="scss" scoped>
header {
  transition: all 350ms ease-in-out;
}

form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: $d auto;
  gap: $d;
}
</style>
