<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<Message>
  }
})
const personalAttr = computed<PersonalAttributes>(() => ({
  ...props.item?.group_attr,
  ...props.item?.message_attr
}))
const date = computed(() => {
  if (props.item?.created_at)
    return new Date(props.item.created_at).toLocaleDateString('en-GB', {
      month: 'short',
      day: 'numeric'
    })
  return '1 Apr'
})
</script>
<template>
  <li>
    <div :style="{ borderColor: personalAttr?.colour ?? 'transparent' }">
      <h3 :class="{ unread: !personalAttr.read }">
        {{ personalAttr?.alias ? personalAttr.alias : item['group_name'] }}
      </h3>
      <p :class="{ unread: !personalAttr.read }">
        {{ item.name }}
      </p>
      <div v-if="item.important" :class="{ unread: !personalAttr.read }">
        <svg
          :class="{ unread: !personalAttr.read }"
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Important</title>
          <path
            d="M9.16669 12.5H10.8334V14.1667H9.16669V12.5ZM9.16669 5.83335H10.8334V10.8334H9.16669V5.83335ZM10 1.66669C5.39169 1.66669 1.66669 5.41669 1.66669 10C1.66669 12.2102 2.54466 14.3298 4.10746 15.8926C4.88128 16.6664 5.79994 17.2802 6.81099 17.699C7.82204 18.1178 8.90567 18.3334 10 18.3334C12.2102 18.3334 14.3298 17.4554 15.8926 15.8926C17.4554 14.3298 18.3334 12.2102 18.3334 10C18.3334 8.90567 18.1178 7.82204 17.699 6.81099C17.2802 5.79994 16.6664 4.88128 15.8926 4.10746C15.1188 3.33364 14.2001 2.71981 13.189 2.30102C12.178 1.88224 11.0944 1.66669 10 1.66669ZM10 16.6667C8.23191 16.6667 6.53622 15.9643 5.28597 14.7141C4.03573 13.4638 3.33335 11.7681 3.33335 10C3.33335 8.23191 4.03573 6.53622 5.28597 5.28597C6.53622 4.03573 8.23191 3.33335 10 3.33335C11.7681 3.33335 13.4638 4.03573 14.7141 5.28597C15.9643 6.53622 16.6667 8.23191 16.6667 10C16.6667 11.7681 15.9643 13.4638 14.7141 14.7141C13.4638 15.9643 11.7681 16.6667 10 16.6667Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
    <p>
      {{ date }}
      •
    </p>
    <router-link :to="{ name: 'messageDetail', params: { id: item.id } }">
      <span> View {{ item.name }} </span>
    </router-link>
  </li>
</template>
<style lang="scss" scoped>
.unread {
  font-weight: 800;
  color: $white;
}

svg {
  color: $white-dark;

  &.unread {
    color: $white;
  }
}

a {
  span {
    @include sr-only;
  }

  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

li {
  display: flex;
  width: 100%;
  align-items: center;
  margin-block: $f;
  gap: $b;
  position: relative;

  &:hover > div {
    background-color: $dark-gray;
  }

  > div {
    display: grid;
    grid-template-columns: 1.25rem 1fr 1fr;
    gap: $b;
    margin-left: $c;
    padding: $d $c;
    @include shadow-dark;
    border-radius: $border-radius;
    border-inline: 3px solid;
    align-items: center;
    width: calc(100% - 3.5rem);

    h3,
    p {
      color: $gray;
      grid-row-start: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }

    p {
      grid-column-start: 3;
    }

    h3 {
      grid-column-start: 2;
    }

    div {
      grid-column-start: 1;
      grid-row-start: 1;
      display: flex;
      align-items: center;
    }
  }

  > p {
    order: -1;
    @include text-sm;
    white-space: nowrap;
    min-width: 3.5rem;
    text-align: right;
  }
}
</style>
