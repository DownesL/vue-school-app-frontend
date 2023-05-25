<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'

const getRandPos = () => Math.random() * 200 - 100
const positions = ref([-89.79427446596722,22.42987917659798,-69.12043999653417,67.10718597049262,-36.85061787464123,17.241351050297112,-35.20303028594168,46.87379398973502,-39.9441046485044,-55.78348566127338,48.19086635120243,-3.7185883176939143,-36.99403928518359,71.84102279781777,-90.07179726251977,-39.23749352561388,-54.54523188363669,-68.01676904384284,-33.984727810448035,98.82934895200276,-6.8186831119087685,-46.49464584271925,-73.46739087033862,-71.58735922654111,-12.405548418185546,51.804208696252715,80.07148212865798,-79.89348062106289,-86.1714378904735,8.062712420739288,7.156399310695008,-16.647168247527034,-98.14565950321472,-13.045784821645512,76.5155742606068,12.873735344958774,53.15698855791115,-90.07465827217014,-6.647717096091753,-17.36401730485126])
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
  <div class="container">
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
    <span>Loading...</span>
  </div>
</template>
<style lang="scss" scoped>
.container {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $background;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 60vh;

  .box {
    position: relative;
    margin: auto;
    z-index: 999;

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
}
</style>
