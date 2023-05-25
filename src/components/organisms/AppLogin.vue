<script lang="ts" setup>
import InputField from '@/components/atoms/InputField.vue'
import { ref } from 'vue'
import AppButton from '@/components/atoms/AppButton.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const authStore = useAuthStore()

const email = ref<string>('')
const password = ref<string>('')

const emailError = ref<string>('')
const passwordError = ref<string>('')
const authError = ref<string>('')
const tryLogin = async () => {
  emailError.value = ''
  passwordError.value = ''

  if (!email.value.trim()) {
    emailError.value = 'Fill in an email address.'
  }
  if (!email.value.trim().match(/[a-z\-.]+@[a-z-]+\.[a-z]{2,4}/)) {
    emailError.value = 'The email must be of the format: "example@mail.ex"  '
  }
  if (!password.value.trim()) {
    password.value = ''
    passwordError.value = 'Fill in a password'
  }

  if (emailError.value || passwordError.value) return

  authError.value = await authStore.login({ email: email.value, password: password.value })

  if (!authError.value) {
    localStorage.setItem('user', JSON.stringify({ email: email.value, password: password.value }))
    await router.push({ name: 'home' })
  } else {
    password.value = ''
  }
}
</script>
<template>
  <h1>Login</h1>
  <p v-if="authError" role="alert">{{ authError }}</p>
  <form action="" method="post" novalidate>
    <InputField v-model:value="email" :error="emailError" name="email" type="email" />
    <InputField v-model:value="password" :error="passwordError" name="password" type="password" />
    <AppButton type="submit" @click.prevent="tryLogin"> Log in</AppButton>
  </form>
  <p>
    No account yet?
    <router-link to="/register">Register here</router-link>
  </p>
</template>
<style lang="scss" scoped>
p {
  &:first-of-type {
    color: $red;
    width: 80%;
    margin-inline: auto;
    text-align: center;
    margin-top: $d;
  }

  &:last-of-type {
    color: $white;
  }

  a {
    color: $purple-light;
    text-decoration: underline;
  }
}

form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: $d auto;
  gap: $d;
}
</style>
