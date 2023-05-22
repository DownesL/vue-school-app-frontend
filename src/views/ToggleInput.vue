<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    required: true,
    type: String
  },
  value: {
    required: true,
    type: Boolean
  }
})
defineEmits(['update:value'])

const label = computed(() => props.name.replace(/(?=[A-Z])/, ' '))
</script>
<template>
  <label>
    <span>{{ label }}</span>
    <span class="switch">
      <input
        :id="name"
        :class="{ active: value }"
        :name="name"
        :value="value"
        type="checkbox"
        @input="$emit('update:value', $event.target.checked)"
      />
      <span class="slider"> </span>
    </span>
  </label>
</template>
<style lang="scss" scoped>
input {
  margin-left: 1rem;
}

label {
  text-transform: capitalize;
  display: inline-flex;
  justify-content: space-between;
  flex-direction: row;
  max-width: 10rem;
  align-items: center;
  &:focus-within {
    outline: $blue solid 2px;
  }
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
}

/* Hide default HTML checkbox */
.switch input {
  @include sr-only;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input.active + .slider {
  background-color: $purple;
}

input:focus + .slider {
  box-shadow: 0 0 1px $purple;
}

input:checked + .slider:before,
input.active + .slider:before {
  -webkit-transform: translateX(15px);
  -ms-transform: translateX(15px);
  transform-origin: center center;
  transform: translateX(15px);
}

/* Rounded sliders */
.slider {
  border-radius: 34px;
}

.slider:before {
  border-radius: 50%;
}
</style>
