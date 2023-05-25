<script lang="ts" setup>
import { ref } from 'vue'
import { useLoadingStore } from '@/stores/loading'
import AppLoading from '@/components/atoms/AppLoading.vue'
const loadingStore = useLoadingStore()

const navOpen = ref(false)
</script>

<template>
  <header>
    <div>
      <router-link :to="{ name: 'home' }">
        <svg
          fill="none"
          height="28"
          viewBox="0 0 30 28"
          width="30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Home</title>
          <g id="logo">
            <path
              id="inner letter"
              d="M5.66661 12.2857L13.7352 5.69908C14.4713 5.09817 15.5286 5.09817 16.2647 5.69908L24.3333 12.2857M5.66661 12.2857V12.6666V21.3333C5.66661 22.4379 6.56204 23.3333 7.66661 23.3333H22.3333C23.4379 23.3333 24.3333 22.4379 24.3333 21.3333V12.2857M5.66661 12.2857L13.8712 17.8949C14.5518 18.3602 15.4481 18.3602 16.1287 17.8949L24.3333 12.2857"
              stroke="currentColor"
            />
            <g id="outer letter">
              <path
                d="M1 11.6667L4.88889 14.3889L13.8302 20.5791C14.5305 21.0639 15.461 21.052 16.1487 20.5495L25.1111 14L29 11.6667V25.2222C29 26.3268 28.1046 27.2222 27 27.2222H3C1.89543 27.2222 1 26.3268 1 25.2222V11.6667Z"
                fill="currentColor"
              />
              <path
                d="M13.7196 1.06697C14.4613 0.448898 15.5387 0.448897 16.2804 1.06697L29 11.6667L25.1111 14V12.6222C25.1111 12.0179 24.8379 11.446 24.3678 11.0663L16.2567 4.51501C15.5235 3.92285 14.4765 3.92285 13.7433 4.51501L5.63221 11.0663C5.16211 11.446 4.88889 12.0179 4.88889 12.6222V14.3889L1 11.6667L13.7196 1.06697Z"
                fill="currentColor"
              />
              <path
                d="M29 11.6667L16.2804 1.06697C15.5387 0.448897 14.4613 0.448898 13.7196 1.06697L1 11.6667M29 11.6667V25.2222C29 26.3268 28.1046 27.2222 27 27.2222H3C1.89543 27.2222 1 26.3268 1 25.2222V11.6667M29 11.6667L25.1111 14M1 11.6667L4.88889 14.3889M4.88889 14.3889L13.8302 20.5791C14.5305 21.0639 15.461 21.052 16.1487 20.5495L25.1111 14M4.88889 14.3889V12.6222C4.88889 12.0179 5.16211 11.446 5.63221 11.0663L13.7433 4.51501C14.4765 3.92285 15.5235 3.92285 16.2567 4.51501L24.3678 11.0663C24.8379 11.446 25.1111 12.0179 25.1111 12.6222V14"
                stroke="currentColor"
              />
              <path
                class="svg-bg"
                d="M29 11.6667L16.2804 1.06697C15.5387 0.448897 14.4613 0.448898 13.7196 1.06697L1 11.6667M29 11.6667V25.2222C29 26.3268 28.1046 27.2222 27 27.2222H3C1.89543 27.2222 1 26.3268 1 25.2222V11.6667M29 11.6667L25.1111 14M1 11.6667L4.88889 14.3889M4.88889 14.3889L13.8302 20.5791C14.5305 21.0639 15.461 21.052 16.1487 20.5495L25.1111 14M4.88889 14.3889V12.6222C4.88889 12.0179 5.16211 11.446 5.63221 11.0663L13.7433 4.51501C14.4765 3.92285 15.5235 3.92285 16.2567 4.51501L24.3678 11.0663C24.8379 11.446 25.1111 12.0179 25.1111 12.6222V14"
                stroke="currentColor"
              />
            </g>
            <g id="smile">
              <circle id="eye right" cx="16.9444" cy="10.5" fill="currentColor" r="0.388889" />
              <circle id="eye left" cx="13.0555" cy="10.5" fill="currentColor" r="0.388889" />
              <path
                id="mouth"
                d="M12.6666 12.4443V12.4443C13.2937 14.848 16.7063 14.848 17.3333 12.4443V12.4443"
                stroke="currentColor"
              />
            </g>
          </g>
        </svg>
        <span class="text-xl"> UpToDate </span>
      </router-link>
      <!--      TODO: CHANGE H1 TO CONTENT HEADER-->
      <button @click="() => (navOpen = !navOpen)">
        <svg
          fill="none"
          height="12"
          viewBox="0 0 18 12"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 0H18V2H0V0ZM0 5H18V7H0V5ZM0 10H18V12H0V10Z" fill="currentColor" />
        </svg>
      </button>
    </div>
    <nav v-if="navOpen" id="navigation">
      <ul :class="{ hidden: !navOpen }">
        <li>
          <router-link :to="{ name: 'home' }" @click="() => (navOpen = !navOpen)">home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'messages' }" @click="() => (navOpen = !navOpen)"
            >messages
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'account' }" @click="() => (navOpen = !navOpen)"
            >account
          </router-link>
        </li>
      </ul>
    </nav>
    <!--    <AppButton @click="doLogin">login</AppButton>-->
  </header>
  <main>
    <RouterView v-if="!loadingStore.loading" />
    <AppLoading v-else />
  </main>
</template>

<style lang="scss" scoped>
nav {
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;

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
        font-size: 2rem;
        padding: $b;
        width: 100%;
        display: inline-flex;
        justify-content: center;
      }
    }
  }
}

header {
  @include shadow-dark;
  display: flex;
  flex-direction: column;
  padding: $d;
  gap: $d;
  background: $background;
  width: 100%;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      display: inline-flex;
      align-items: center;
      gap: $b;
      color: $text;
      text-decoration: none;
    }

    button {
      color: $text;
    }
  }
}

main {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#logo,
#logo * {
  color: $purple;

  &.svg-bg {
    color: $background;
  }
}
</style>
