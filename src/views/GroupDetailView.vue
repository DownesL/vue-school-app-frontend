<script lang="ts" setup>
import MessageTeaser from '@/components/molecules/MessageTeaser.vue'
import AppLink from '@/components/atoms/AppLink.vue'
import PageTeaser from '@/components/molecules/PageTeaser.vue'
import { useGroupStore } from '@/stores/group'

interface Organisation {
  name: string
}

interface Group {
  id: number
  name: string
  alias: string
  colour: string
  organisation: Organisation
}

interface Message {
  id: number
  title: string
  date: any
  important: Boolean
  read: Boolean
  text: string
}

const props = defineProps({
  id: {
    required: true,
    type: String
  }
})
const groupStore = useGroupStore()
groupStore.getGroupInfo(props.id)
</script>
<template>
  <h1 class="sr-only">Group {{ groupStore.selectedGroup?.name }}: Detail Page</h1>
  <PageTeaser>
    <template v-slot:title>{{ groupStore.selectedGroup?.name }}</template>
    <template v-slot:content>
      <h3>{{ groupStore.selectedGroup?.organisation?.name }}</h3>
      <!--      TODO: ONLY FOR NON ADMIN AND MAKE THIS EDITABLE-->
      <p>Alias: {{ groupStore.selectedGroup?.group_attr?.alias ?? 'none' }}</p>
      <label for="groupColour">Group Colour:</label>
      <div
        :style="{ backgroundColor: groupStore.selectedGroup?.members[0].grp_attr?.colour }"
        style="width: 20px; height: 20px; border-radius: 10px"
      ></div>
      <!--      <input-->
      <!--        id="groupColour"-->
      <!--        :value="groupStore.selectedGroup?.colour"-->
      <!--        name="groupColour"-->
      <!--        type="color"-->
      <!--      />-->
    </template>
  </PageTeaser>
  <PageTeaser v-if="groupStore.selectedGroup?.messages">
    <!--    TODO: ONLY FOR ADMIN-->
    <template v-slot:title>Recent Messages</template>
    <template v-slot:content>
      <p v-if="!groupStore.selectedGroup?.messages" class="text-center my-2">
        Wow, so empty! Seems like you don’t have any recent messages!
      </p>
      <ul v-else class="my-3">
        <MessageTeaser
          v-for="i in groupStore.selectedGroup?.messages?.filter((x) => !x.read).slice(0, 3)"
          :key="i.id"
          :item="i"
        />
      </ul>
      <AppLink :url="{ name: 'messages', query: { groups: [groupStore.selectedGroup.id] } }"
        >View Messages
      </AppLink>
    </template>
  </PageTeaser>
  <PageTeaser>
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
  <PageTeaser>
    <template v-slot:title>Join Requests</template>
    <template v-slot:content>
      <ul class="w-full">
        <li class="w-4/5 text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb mx-auto">
          <div class="flex bg-white justify-between py-3">
            <p>member 1</p>
            <div class="flex gap-2">
              <button>add</button>
              <button>reject</button>
            </div>
          </div>
        </li>
        <li class="w-4/5 text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb mx-auto">
          <div class="flex bg-white justify-between py-3">
            <p>member 1</p>
            <div class="flex gap-2">
              <button>add</button>
              <button>reject</button>
            </div>
          </div>
        </li>
        <li class="w-4/5 text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb mx-auto">
          <div class="flex bg-white justify-between py-3">
            <p>member 1</p>
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
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
