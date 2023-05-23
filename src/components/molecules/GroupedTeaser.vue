<script lang="ts" setup>
import {computed, PropType} from 'vue'
import NameSpan from '@/components/atoms/NameSpan.vue'
import { useGroupStore } from '@/stores/group'


const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<Group | Organisation>
  },
  showChecked: {
    required: false,
    type: Boolean,
    default: false
  },
  isJoined: {
    required: false,
    type: Boolean,
    default: false
  },
  link: {
    required: false,
    type: String,
    default: ''
  }
})
const groupStore = useGroupStore()

const selected = computed(() => groupStore.selectedGroup === props.item)

const setSelected = (el: any) => {
  if (props.isJoined) return
  if (groupStore.selectedGroup === el) groupStore.selectedGroup = null
  else groupStore.selectedGroup = el
}
</script>
<template>
  <li :class="{ between: showChecked || selected }">
    <template v-if="link">
      <h3>
        <NameSpan :group="item" />
      </h3>
      <svg
        v-if="showChecked && isJoined"
        fill="none"
        height="14"
        viewBox="0 0 18 14"
        width="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z" fill="black" />
      </svg>
      <router-link :to="{ name: link, params: { id: item.id } }">
        <NameSpan :group="item" />
        <span>Detail Page</span>
      </router-link>
    </template>
    <template v-else>
      <button
        :class="showChecked ? 'between' : 'center'"
        :title="item.name + ' ' + (item.organisation_name ?? '')"
        @click="setSelected(item)"
      >
        <NameSpan :group="item" />
        <svg
          v-if="showChecked && isJoined"
          fill="none"
          height="14"
          viewBox="0 0 18 14"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 1.41L5.5 13.41L0 7.91L1.41 6.5L5.5 10.58L16.09 0L17.5 1.41Z"
            fill="currentColor"
          />
        </svg>
        <span v-if="selected" class="selected"> selected </span>
      </button>
    </template>
  </li>
</template>
<style lang="scss" scoped>
//text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb w-4/5 mx-auto

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

  &:hover {
    background: $dark-gray;
  }

  & > a {
    position: absolute;
    display: inline-flex;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    span {
      @include sr-only;
    }
  }

  &:not(:last-of-type) {
    border-radius: $border-radius $border-radius 0 0;
    border-bottom: 2px solid $purple;
  }

}

button {
  display: inline-flex;
  background: transparent;
  color: $text;
  align-items: center;
  justify-content: center;

  gap: $b;
  height: 100%;
  width: 100%;
  font-size: $d;

  span {
    &:first-of-type {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-inline-end: 1rem;
      @include text-lg;
    }

    &.selected {
      font-size: $c;
      @include text-sm;
      background: $gray;
      position: relative;
      z-index: 3;
      padding-inline: $b;
      border-radius: 5px;
    }
  }
}

.between {
  justify-content: space-between;
}
</style>