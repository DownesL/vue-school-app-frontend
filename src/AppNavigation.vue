<script setup>
import { useAuthStore } from '@/stores/auth'

defineProps({
  navOpen: {
    required: true,
    type: Boolean
  }
})

const authStore = useAuthStore()
</script>
<template>
  <nav v-if="navOpen" id="navigation">
    <ul :class="{ hidden: !navOpen }">
      <template v-if="authStore.user">
        <li>
          <router-link :to="{ name: 'home' }"> Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'messages' }"> Messages</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'account' }"> Account</router-link>
        </li>
      </template>
      <li v-else>
        <router-link :to="{ name: 'login' }"> Login</router-link>
      </li>
    </ul>
  </nav>
  <nav class="desktop-nav">
    <ul :class="{ hidden: !navOpen }">
      <template v-if="authStore.user">
        <li>
          <router-link :to="{ name: 'home' }"> Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'messages' }"> Messages</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'account' }"> Account</router-link>
        </li>
      </template>
      <li v-else>
        <router-link :to="{ name: 'login' }"> Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  ul {
    list-style: none;
    display: flex;
    padding: 0;
    align-items: center;
    width: 100%;

    li {
      border-radius: $border-radius;
      margin-block: $a;
      width: 100%;
      border: 3px solid transparent;

      &:hover {
        //background-color: $dark-gray;
        border: 3px dashed $purple;
      }

      a {
        color: $text;
        padding: $b;
        width: 100%;
        display: inline-flex;
        justify-content: center;
      }
    }
  }
}

#navigation ul {
  flex-direction: column;
  height: 100%;

  a {
    font-size: 2rem;
  }
}
.desktop-nav {
  min-width: 40%;
  display: none;
}

@media (min-width: 920px) {
  nav {
    &#navigation {
      display: none;
      height: 100%;
    }

    &.desktop-nav {
      display: flex;
    }
  }
}
</style>
