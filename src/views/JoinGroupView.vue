<script lang="ts" setup>
import InputField from '../components/atoms/InputField.vue'
import {ref} from 'vue'
import AppLink from '@/components/atoms/AppLink.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import {useGroupStore} from '@/stores/group'
import AppButton from "@/components/atoms/AppButton.vue";

const props = defineProps({
  id: {
    required: true,
    type: String,
  }
})
// TODO: FORM-CHECKING

const groupStore = useGroupStore()

const alias = ref<string>('')
const motivation = ref<string>('')
const colour = ref<string>('#8357e5')
const aliasExplanation = ref<boolean>(false)
const colourExplanation = ref<boolean>(false)
</script>
<template>
  <h1 class="sr-only">Join group form</h1>
  <PageTeaser>
    <template v-slot:title> Join {{ groupStore.selectedGroup?.name }}</template>
    <template v-slot:content>
      <form method="post" novalidate>
        <div class="flex flex-col gap-2 mt-4">
          <div class="flex gap-2 items-end">
            <InputField v-model:value="alias" name="Alias" type="text"/>
            <button
                :aria-expanded="aliasExplanation"
                :class="aliasExplanation ? 'text-black' : 'text-gray-500'"
                aria-controls="alias-explanation"
                class="border border-[currentColor] cursor-pointer rounded-[50%] mb-2.5 inline-flex justify-center w-[1.5rem] h-[1.5rem]"
                @click.prevent="() => (aliasExplanation = !aliasExplanation)"
            >
              i
            </button>
          </div>
          <p v-if="aliasExplanation" id="alias-explanation" class="text-sm text-gray-700">
            You can assign an alias to your joined groups, e.g. 'Phil's class' or 'Phil's sport'
          </p>
          <div class="flex gap-2 items-center">
            <label for="colour">Group Colour</label>
            <div class="flex rounded-md overflow-hidden">
              <input
                  id="colour"
                  v-model="colour"
                  class="rounded-md scale-105"
                  name="colour"
                  type="color"
              />
            </div>
            <button
                :aria-expanded="colourExplanation"
                :class="colourExplanation ? 'text-black' : 'text-gray-500'"
                aria-controls="colour-explanation"
                class="border border-[currentColor] cursor-pointer rounded-[50%] inline-flex justify-center w-[1.5rem] h-[1.5rem]"
                @click.prevent="() => (colourExplanation = !colourExplanation)"
            >
              i
            </button>
          </div>

          <p v-if="colourExplanation" id="colour-explanation" class="text-sm text-gray-700">
            You can assign a colour to every group to be able to differentiate easily between them
          </p>
        </div>
        <div class="flex flex-col mx-auto mt-2 mb-4">
          <label for="motivation">Motivation</label>
          <p class="text-sm text-gray-700">Fill in your motivation, e.g.'Phil's parent'</p>
          <textarea
              id="motivation"
              v-model="motivation"
              class="px-3 py-2 border border-black border-opacity-40 rounded-md"
              cols="30"
              name="motivation"
              rows="5"
          />
          <AppButton type="submit" class="w-full" >Send Request</AppButton>
        </div>
      </form>
    </template>
  </PageTeaser>
</template>
<script></script>