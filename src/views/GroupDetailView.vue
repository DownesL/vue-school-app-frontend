<script lang="ts" setup>
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import AppLink from '@/components/atoms/AppLink.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import { useGroupStore } from '@/stores/group'
import InputField from '@/components/atoms/InputField.vue'
import { ref } from 'vue'
import ToggleInput from '@/components/atoms/ToggleInput.vue'
import AppButton from '@/components/atoms/AppButton.vue'

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})
const groupStore = useGroupStore()
groupStore.getGroupInfo(props.id)

const alias = ref<string>(groupStore.selectedGroup?.group_attr?.alias ?? '')
const aliasError = ref<string>('')
const colour = ref<string>(groupStore.selectedGroup?.group_attr?.colour ?? '')
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
          <label for="groupColour">Group Colour:</label>
          <div
            :style="{ backgroundColor: groupStore.selectedGroup?.group_attr?.colour }"
            :title="groupStore.selectedGroup?.group_attr?.colour"
            style="width: 20px; height: 20px; border-radius: 10px"
          ></div>
        </template>
        <form v-else novalidate>
          <InputField v-model:value="alias" :error="aliasError" name="alias" type="text" />
          <label for="groupColour"
            >Colour: <span class="error" role="alert">{{ colourError }}</span></label
          >
          <input id="groupColour" v-model="colour" name="groupColour" type="color" />
          <AppButton type="submit" @click.prevent="trySave">Save</AppButton>
        </form>
      </template>
    </template>
  </PageTeaser>
  <PageTeaser v-if="groupStore.selectedGroup?.messages">
    <template v-slot:title>Recent Messages</template>
    <template v-slot:content>
      <p v-if="!groupStore.selectedGroup?.messages" class="text-center my-2">
        Wow, so empty! Seems like you don’t have any recent messages!
      </p>
      <ul v-else class="my-3">
        <MessageTeaser v-for="i in groupStore.selectedGroup?.messages" :key="i.id" :item="i" />
      </ul>
      <AppLink :url="{ name: 'messages', query: { q: groupStore.selectedGroup?.name } }"
        >View Messages
      </AppLink>
    </template>
  </PageTeaser>
  <PageTeaser v-if="groupStore.selectedGroup?.admin">
    <template v-slot:title>Members</template>
    <template v-slot:content>
      <ul v-if="groupStore.selectedGroup?.members">
        <li v-for="u in groupStore.selectedGroup.members" :key="u.id">
          {{ u.first_name }} {{ u.last_name }}
        </li>
      </ul>
    </template>
  </PageTeaser>
  <!--  TODO: COLLAPSABLE SO USER MOTIVATION IS VISIBLE-->
  <PageTeaser v-if="groupStore.selectedGroup?.admin">
    <template v-slot:title>Join Requests</template>
    <template v-slot:content>
      <ul class="full-w">
        <li v-for="jr in groupStore.selectedGroup.join_requests" :key="jr.id" class="w-4/5 text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb mx-auto">
          <div class="">
            <p>{{jr.user.first_name}} {{ jr.user.last_name}}</p>
            <div class="flex gap-2">
              <button>add</button>
              <button>reject</button>
            </div>
          </div>
        </li>
      </ul>
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

h2 {
}

.organName {
  color: $white-dark;
  order: -1;
}
</style>
