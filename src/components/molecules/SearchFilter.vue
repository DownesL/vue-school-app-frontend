<script lang="ts" setup>
import {useMessageStore} from '@/stores/message'

const messageStore = useMessageStore()
</script>
<template>
  <div class="flex items-center">
    <span class="sr-only">Search</span>
    <label class="absolute pl-0.5" for="search">
      <svg
          fill="none"
          height="25"
          title="search"
          viewBox="0 0 25 25"
          width="25"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            :fill="messageStore.search?.length ? '#000' : '#BBB'"
            d="M9.78949 3.93176C11.5134 3.93176 13.1667 4.61658 14.3857 5.83557C15.6047 7.05455 16.2895 8.70786 16.2895 10.4318C16.2895 12.0418 15.6995 13.5218 14.7295 14.6618L14.9995 14.9318H15.7895L20.7895 19.9318L19.2895 21.4318L14.2895 16.4318V15.6418L14.0195 15.3718C12.8795 16.3418 11.3995 16.9318 9.78949 16.9318C8.06558 16.9318 6.41228 16.2469 5.1933 15.028C3.97431 13.809 3.28949 12.1557 3.28949 10.4318C3.28949 8.70786 3.97431 7.05455 5.1933 5.83557C6.41228 4.61658 8.06558 3.93176 9.78949 3.93176ZM9.78949 5.93176C7.28949 5.93176 5.28949 7.93176 5.28949 10.4318C5.28949 12.9318 7.28949 14.9318 9.78949 14.9318C12.2895 14.9318 14.2895 12.9318 14.2895 10.4318C14.2895 7.93176 12.2895 5.93176 9.78949 5.93176Z"
        />
      </svg>
    </label>
    <input
        id="search"
        v-model="messageStore.search"
        :style="{ 'border-color': messageStore.search?.length ? '#000' : '#BBB' }"
        class="border rounded-md px-2 py-1 text-sm pl-[28px]"
        name="search"
        placeholder="Search"
        type="text"
    />
  </div>
</template>
<style lang="css" scoped>
header {
  transition: all 350ms ease-in-out;
}
</style>