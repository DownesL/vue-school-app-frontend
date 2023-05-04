<script setup lang="ts">
import InputField from './InputField.vue'
import { ref } from 'vue'
import AppButton from '@/components/atoms/AppButton.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'

const alias = ref<string>('')
const motivation = ref<string>('')
const colour = ref<string>('#8357e5')
const aliasExplanation = ref<boolean>(false)
const colourExplanation = ref<boolean>(false)
</script>
<template>
  <PageTeaser>
    <template v-slot:title> Join [Group Name]</template>
    <template v-slot:content>
      <div class="flex flex-col items-center gap-2 mt-4">
        <div class="flex gap-2 items-center">
          <InputField name="alias" type="text" v-model:value="alias" />
          <span
            aria-controls="alias-explanation"
            :aria-expanded="aliasExplanation"
            @click="() => (aliasExplanation = !aliasExplanation)"
            :class="aliasExplanation ? 'text-black' : 'text-gray-500'"
            class="border border-[currentColor] cursor-pointer rounded-[50%] inline-flex justify-center w-[1.5rem] h-[1.5rem]"
          >
            i
          </span>
        </div>
        <div class="flex gap-2 items-center">
          <label for="colour" class="sr-only">Group Colour</label>
          <div class="flex rounded-md overflow-hidden">
            <input
              class="rounded-md scale-105"
              id="colour"
              name="colour"
              type="color"
              v-model="colour"
            />
          </div>
          <span
            aria-controls="colour-explanation"
            :aria-expanded="colourExplanation"
            @click="() => (colourExplanation = !colourExplanation)"
            :class="colourExplanation ? 'text-black' : 'text-gray-500'"
            class="border border-[currentColor] cursor-pointer rounded-[50%] inline-flex justify-center w-[1.5rem] h-[1.5rem]"
          >
            i
          </span>
        </div>
        <p id="alias-explanation" v-if="aliasExplanation">
          You can assign an alias to your joined groups, e.g. 'Phil's class' or 'Phil's sport'
        </p>
        <p id="colour-explanation" v-if="colourExplanation">
          You can assign a colour to every group to be able to differentiate easily between them
        </p>
      </div>
      <div class="flex flex-col mx-auto items-center mt-2 gap-4 mb-4">
        <textarea
          name="motivation"
          placeholder="Fill in your motivation, e.g.'Phil's parent'"
          class="px-3 py-2 border border-black border-opacity-40 rounded-md"
          id="motivation"
          cols="30"
          rows="5"
          v-model="motivation"
        />
        <AppButton url="/groups" @click.prevent>Send Request</AppButton>
      </div>
    </template>
  </PageTeaser>
</template>
<script></script>
