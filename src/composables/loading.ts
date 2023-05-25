import { ref } from 'vue'

const isLoading = ref(false)

export function useLoading() {
  function update(v: boolean) {
    isLoading.value = v
  }
  function get() {
    return isLoading.value
  }

  return {
    update,
    get,
    isLoading
  }
}
