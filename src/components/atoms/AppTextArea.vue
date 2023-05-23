<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  error: {
    required: false,
    type: String || null,
    default: ''
  },
  required: {
    required: false,
    type: Boolean,
    default: true
  },
  value: {
    required: true,
    type: String
  }
})
const label = computed(() => props.name.replace(/(?=[A-Z])/, ' '))
</script>
<template>
  <div>
    <label :for="name">
      <span>{{ label }}</span>
      <span role="alert">{{ error }}</span>
    </label>
    <textarea
      :id="name"
      :class="{ error: error }"
      :name="name"
      :value="value"
      rows="5"
      @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>
<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
}

label {
  span:first-of-type {
    text-transform: capitalize;
    color: $text;
  }

  span:last-of-type {
    color: $red;
    margin-left: $c;
  }
}

textarea {
  border: solid 1px $input-border;
  border-radius: $border-radius;
  padding: $b $c;
  background: $background;
  color: $text;

  &.error {
    border-color: $red;
    outline-color: red;
  }
}
</style>
