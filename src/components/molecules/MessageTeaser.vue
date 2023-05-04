<script lang="ts" setup>
defineProps({
  item: {
    required: true,
    type: Object
  }
})
</script>
<template>
  <router-link :to="'/messages/' + item.id">
    <section class="flex w-full items-center my-6 gap-2">
      <div
        :style="{ borderColor: item.group.colour }"
        class="grid grid-cols-message-teaser gap-2 py-5 px-3 shadow-light rounded-md border-4 border-y-0"
      >
        <h3
          :class="{ 'font-bold': !item.read }"
          class="col-start-2 overflow-hidden overflow-ellipsis whitespace-nowrap"
        >
          {{ item.group.name }}
        </h3>
        <p
          :class="{ 'font-bold': !item.read }"
          class="col-start-3 overflow-hidden overflow-ellipsis whitespace-nowrap"
        >
          {{ item.title }}
        </p>
        <div
          v-if="item.important"
          :class="{ 'text-gray-400': item.read }"
          class="col-start-1 row-start-1 flex items-center"
        >
          <svg
            :class="{ 'font-bold': !item.read }"
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16669 12.5H10.8334V14.1667H9.16669V12.5ZM9.16669 5.83335H10.8334V10.8334H9.16669V5.83335ZM10 1.66669C5.39169 1.66669 1.66669 5.41669 1.66669 10C1.66669 12.2102 2.54466 14.3298 4.10746 15.8926C4.88128 16.6664 5.79994 17.2802 6.81099 17.699C7.82204 18.1178 8.90567 18.3334 10 18.3334C12.2102 18.3334 14.3298 17.4554 15.8926 15.8926C17.4554 14.3298 18.3334 12.2102 18.3334 10C18.3334 8.90567 18.1178 7.82204 17.699 6.81099C17.2802 5.79994 16.6664 4.88128 15.8926 4.10746C15.1188 3.33364 14.2001 2.71981 13.189 2.30102C12.178 1.88224 11.0944 1.66669 10 1.66669ZM10 16.6667C8.23191 16.6667 6.53622 15.9643 5.28597 14.7141C4.03573 13.4638 3.33335 11.7681 3.33335 10C3.33335 8.23191 4.03573 6.53622 5.28597 5.28597C6.53622 4.03573 8.23191 3.33335 10 3.33335C11.7681 3.33335 13.4638 4.03573 14.7141 5.28597C15.9643 6.53622 16.6667 8.23191 16.6667 10C16.6667 11.7681 15.9643 13.4638 14.7141 14.7141C13.4638 15.9643 11.7681 16.6667 10 16.6667Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <p class="order-first text-sm whitespace-nowrap min-w-3/5 text-right">
        {{ new Date(item.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) }}
        •
      </p>
    </section>
  </router-link>
</template>
