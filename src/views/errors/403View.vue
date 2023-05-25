<script setup></script>
<template>
  <div class="container">
    <h1>Sorry this page couldn't be accessed</h1>
    <p>Maybe try out one of our other pages, they might be worth your while!</p>
    <router-link :to="{ name: 'home' }">Home</router-link>
  </div>
</template>
<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-inline: auto;
}

.container {
  margin-inline: 2rem;
}

p {
  max-width: 40rem;
  text-align: center;
  margin-inline: auto;
}
</style>
