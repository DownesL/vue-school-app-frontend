<script setup lang="ts">
import type { PropType } from 'vue'
import { ref } from 'vue'

defineProps({
  jr: {
    required: true,
    type: Object as PropType<JoinRequest>
  }
})
const showDescription = ref(false)
</script>
<template>
  <li>
    <section>
      <div>
        <h3>{{ jr.user.first_name }} {{ jr.user.last_name }}</h3>
        <button
          :aria-expanded="showDescription"
          aria-controls="motivation"
          class="info"
          @click="() => (showDescription = !showDescription)"
        >
          <svg
            fill="none"
            height="16"
            viewBox="0 0 25 25"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Motivation</title>
            <path
              d="M13.0928 9.67462H11.0928V7.67462H13.0928M13.0928 17.6746H11.0928V11.6746H13.0928M12.0928 2.67462C10.7796 2.67462 9.47919 2.93328 8.26594 3.43583C7.05268 3.93837 5.95029 4.67497 5.02171 5.60355C3.14634 7.47892 2.09277 10.0225 2.09277 12.6746C2.09277 15.3268 3.14634 17.8703 5.02171 19.7457C5.95029 20.6743 7.05268 21.4109 8.26594 21.9134C9.47919 22.416 10.7796 22.6746 12.0928 22.6746C14.7449 22.6746 17.2885 21.6211 19.1638 19.7457C21.0392 17.8703 22.0928 15.3268 22.0928 12.6746C22.0928 11.3614 21.8341 10.061 21.3316 8.84779C20.829 7.63453 20.0924 6.53214 19.1638 5.60355C18.2353 4.67497 17.1329 3.93837 15.9196 3.43583C14.7064 2.93328 13.406 2.67462 12.0928 2.67462Z"
              fill="currentColor"
            />
          </svg>
          <span> Motivation </span>
        </button>
      </div>
      <slot></slot>
    </section>
    <p v-if="showDescription" id="motivation">{{ jr.motivation }}</p>
  </li>
</template>
<style lang="scss" scoped>
li {
  border-bottom: $purple;
  border-radius: $border-radius;
  transition: $transition;
  padding: $c $d;

  > section {
    display: flex;
    text-align: center;
    position: relative;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    flex-grow: 0;
    width: 100%;
    background: $background;
    color: $text;

    div {
      display: flex;
    }
  }

  p {
    margin-block: 2rem 1rem;
  }

  &:not(:last-of-type) {
    border-radius: $border-radius $border-radius 0 0;
    border-bottom: 2px solid $purple;
  }
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

  &.info {
    color: cornflowerblue;
    border: 1px dashed cornflowerblue;
    margin-right: 1rem;
    font-weight: 600;
    order: -1;

    &:hover {
      background: cornflowerblue;
      color: $background;
    }
  }
}

h1 {
  @include sr-only;
}

p {
  text-align: center;
  margin-block: 1rem;
}
</style>
