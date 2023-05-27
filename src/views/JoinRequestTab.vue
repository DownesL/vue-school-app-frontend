<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import type { PropType } from 'vue'
import { apiAxios } from '@/instances/apiAxios'
import JoinRequest from '@/views/JoinRequest.vue'

defineProps({
  joinRequests: {
    required: true,
    type: Array as PropType<JoinRequest[]>
  }
})
const emit = defineEmits(['updateSelected'])
const accept = async (id: number) => {
  try {
    const { data: res } = await apiAxios.put(`join-requests/${id}/accept`)
    emit('updateSelected', res.data)
  } catch (e: any) {
    console.log(e)
  }
}
const reject = async (id: number) => {
  try {
    const { data: res } = await apiAxios.put(`join-requests/${id}/reject`)
    emit('updateSelected', res.data)
  } catch (e: any) {
    console.log(e)
  }
}
</script>
<template>
  <PageTeaser>
    <template v-slot:title>Join Requests</template>
    <template v-slot:content>
      <ul v-if="joinRequests.length" class="full-w">
        <JoinRequest v-for="jr in joinRequests" :key="jr.id" :jr="jr as JoinRequest">
          <div>
            <button @click="accept(jr.id)">
              <svg
                fill="none"
                height="16"
                viewBox="0 0 25 25"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Accept</title>
                <path
                  d="M21.0928 7.67465L9.09277 19.6746L3.59277 14.1746L5.00277 12.7646L9.09277 16.8446L19.6828 6.26465L21.0928 7.67465Z"
                  fill="currentColor"
                />
              </svg>

              <span> Accept </span>
            </button>
            <button @click="reject(jr.id)">
              <svg
                fill="none"
                height="16"
                viewBox="0 0 25 25"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Reject</title>
                <path
                  d="M14.1581 12.5912L19.6981 18.1312V19.5912H18.2381L12.6981 14.0512L7.15812 19.5912H5.69812V18.1312L11.2381 12.5912L5.69812 7.05125V5.59125H7.15812L12.6981 11.1312L18.2381 5.59125H19.6981V7.05125L14.1581 12.5912Z"
                  fill="currentColor"
                />
              </svg>

              <span> Reject </span>
            </button>
          </div>
        </JoinRequest>
      </ul>
      <p v-else>No pending Join Requests</p>
    </template>
  </PageTeaser>
</template>
<style lang="scss" scoped>
h1 {
  @include sr-only;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

button {
  color: white;
  padding: 4px 6px 2px;
  height: 2rem;
  width: 2rem;
  border: 1px solid transparent;
  border-radius: $border-radius;

  span {
    @include sr-only;
  }

  &:first-of-type {
    color: #92e553;
    border: 1px dashed #92e553;
    margin-right: 1rem;
    font-weight: 600;

    &:hover {
      background: #92e553;
      color: $background;
    }
  }

  &:last-of-type {
    color: #ff4444;
    font-weight: 600;
    border: 1px dashed #ff4444;

    &:hover {
      background: #ff4444;
      color: $background;
    }
  }
}

p {
  text-align: center;
  margin-block: 1rem;
}
</style>
