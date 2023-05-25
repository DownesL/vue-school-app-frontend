<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

const getRandPos = () => Math.random() * 200 - 100
const positions = ref(Array.from({ length: 20 }, () => getRandPos()))
const interval = setInterval(() => {
  positions.value = []
  positions.value = Array.from({ length: 40 }, () => getRandPos())
}, 1000)

onUnmounted(() => {
  clearInterval(interval)
})
</script>
<script></script>
<template>
  <div class="box">
    <div
      v-for="i in 20"
      :key="i"
      :style="{
        left: positions[i] + 'px',
        top: positions[i + 20] + 'px'
      }"
      class="boxItem"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
.box {
  position: absolute;
  display: flex;
  margin: auto;
  z-index: -1;
  top: 50%;
  left: 50%;

  .boxItem {
    position: absolute;
    background-color: $purple;
    opacity: 40%;
    border-radius: 5px;
    display: flex;
    height: 2rem;
    width: 2rem;
    transition: all ease-in-out 500ms;
  }
}
</style>
