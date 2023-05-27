<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import type { PropType } from 'vue'

defineProps({
  members: {
    required: true,
    type: Array as PropType<User[]>
  }
})
</script>
<template>
  <PageTeaser>
    <template v-slot:title>Members</template>
    <template v-slot:content>
      <ul class="w-full" v-if="members?.length">
        <li v-for="g in members" :key="g.id">
          {{ g.first_name }} {{ g.last_name }}
        </li>
      </ul>
      <p v-else>No members joined yet</p>
    </template>
  </PageTeaser>
</template>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
}

li {
  display: inline-flex;
  background: $background;
  color: $text;
  text-align: center;
  width: 100%;
  position: relative;
  align-items: center;
  border-bottom: $purple;
  flex-grow: 0;
  overflow: hidden;
  border-radius: $border-radius;
  transition: $transition;
  padding: $c $d;
  justify-content: center;

  &:not(:last-of-type) {
    border-radius: $border-radius $border-radius 0 0;
    border-bottom: 2px solid $purple;
  }
}
</style>
