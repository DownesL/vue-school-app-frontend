<script lang="ts" setup>
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import { useGroupStore } from '@/stores/group'
import InputField from '@/components/atoms/InputField.vue'
import { ref, watchEffect } from 'vue'
import ToggleInput from '@/components/atoms/ToggleInput.vue'
import AppButton from '@/components/atoms/AppButton.vue'
import MembersTab from '@/components/organisms/MembersTab.vue'
import JoinRequestTab from '@/components/organisms/JoinRequestTab.vue'
import MessagesTab from '@/components/organisms/MessagesTab.vue'
import AppLink from '@/components/atoms/AppLink.vue'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})
const groupStore = useGroupStore()
groupStore.getGroupInfo(props.id)

const alias = ref<string>('')
const aliasError = ref<string>('')
const colour = ref<string>('')
const colourError = ref<string>('')
const editable = ref<boolean>(false)

const trySave = async () => {
  aliasError.value = ''
  if (alias.value.length > 50) {
    aliasError.value = 'alias should be shorter than 50 characters'
  }
  if (!colour.value.match(/#[a-fA-F0-9]{6}|rgb\(([0-2][0-9][0-9],){3}\)/)) {
    colourError.value = 'coulour should be of format: rgb(xxx,xxx,xxx) or #xxxxxx'
  }

  if (!aliasError.value || !colourError.value) {
    await groupStore.setAttributes(props.id, { alias: alias.value, colour: colour.value })
    window.location.assign(window.location.href)
  }
}
watchEffect(() => {
  colour.value = groupStore.selectedGroup?.group_attr?.colour ?? ''
  alias.value = groupStore.selectedGroup?.group_attr?.alias ?? ''
})
</script>
<template>
  <h1>Group {{ groupStore.selectedGroup?.name }}: Detail Page</h1>
  <PageTeaser>
    <template v-slot:title>{{ groupStore.selectedGroup?.name }}</template>
    <template v-slot:content>
      <h3 class="organName">{{ groupStore.selectedGroup?.organisation_name }}</h3>
      <template v-if="!groupStore.selectedGroup?.admin">
        <ToggleInput v-model:value="editable" name="Edit" />
        <template v-if="!editable">
          <p>Alias: {{ groupStore.selectedGroup?.group_attr?.alias ?? 'none' }}</p>
          <span>Group Colour:</span>
          <div
            :style="{ backgroundColor: groupStore.selectedGroup?.group_attr?.colour }"
            :title="groupStore.selectedGroup?.group_attr?.colour"
            style="width: 20px; height: 20px; border-radius: 10px"
          ></div>
        </template>
        <form v-else novalidate>
          <InputField v-model:value="alias" :error="aliasError" name="alias" type="text" />
          <div>
            <label for="groupColour"
              >Colour: <span class="error" role="alert">{{ colourError }}</span></label
            >
            <span>
              <input id="groupColour" v-model="colour" name="groupColour" type="color" />
            </span>
          </div>
          <AppButton type="submit" @click.prevent="trySave">Save</AppButton>
        </form>
      </template>
    </template>
  </PageTeaser>
  <MessagesTab
    v-if="groupStore.selectedGroup?.messages"
    :messages="groupStore.selectedGroup?.messages as Message[]"
  >
    <AppLink :url="{ name: 'messages', query: { q: groupStore.selectedGroup?.name } }"
      >View Messages
    </AppLink>
  </MessagesTab>
  <MembersTab
    v-if="groupStore.selectedGroup?.admin && groupStore.selectedGroup.members"
    :members="groupStore.selectedGroup.members as User[]"
  />
  <JoinRequestTab
    v-if="groupStore.selectedGroup?.admin"
    :join-requests="groupStore.selectedGroup?.join_requests as JoinRequest[]"
  />
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

h2 {
}

.organName {
  color: $white-dark;
  order: -1;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label + span {
  display: inline-block;
  width: 3rem;
  height: 1.2em;
  margin: 4px 4px -2px;
  overflow: hidden;
  border-radius: $border-radius;
  &:focus-within {
    border: 2px solid blue;
    outline: 2px solid white;
    outline-offset: 1px;
  }

  input {
    scale: 2;
  }
}
</style>
