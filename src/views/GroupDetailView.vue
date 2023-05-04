<script setup lang="ts">
import MessageTeaser from "@/components/molecules/MessageTeaser.vue";
import {ref} from "vue";
import {useMessageStore} from "@/stores/message";
import AppButton from "@/components/atoms/AppButton.vue";
import PageTeaser from "@/components/molecules/PageTeaser.vue";

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

//TODO : GET REQUEST TO GROUP MESSAGES
const group = ref<Group | null>(null)
const messages = ref<Message[]>([])
const messageStore = useMessageStore()
messages.value = messageStore.messages.filter(x => x.group.id === 1)
group.value = messageStore.groups.filter(x => x.id === 1)[0]
</script>
<template>
  <PageTeaser>
    <template v-slot:title>{{ group.name }}</template>
    <template v-slot:content>
      <h3>{{ group.organisation.name }}</h3>
      <p>Alias: {{ group.alias.length ? group.alias : 'none' }}</p>
      <label for="groupColour">Group Colour:</label>
      <input type="color" id="groupColour" name="groupColour" :value="group.colour"/>
    </template>

  </PageTeaser>
  <PageTeaser v-if="messageStore.groups.length">
    <template v-slot:title>Messages</template>
    <template v-slot:content>
      <p v-if="!messageStore.messages" class="text-center my-2">
        Wow, so empty! Seems like you don’t have any unread messages!
      </p>
      <section v-else class="my-3">
        <h3 class="sr-only">unread messages</h3>
        <MessageTeaser
            v-for="i in messages?.filter((x) => !x.read).slice(0, 3)"
            :key="i.id"
            :item="i"
        />
      </section>
      <AppButton :url="'/messages?groups=1'">View Messages</AppButton>
    </template>
  </PageTeaser>
  <PageTeaser>
    <template v-slot:title>Members</template>
    <template v-slot:content>
      <ul>
        <li>member 1</li>
        <li>member 2</li>
        <li>member 3</li>
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
            <p> member 1 </p>
            <div class="flex gap-2">
              <button>add</button>
              <button>reject</button>
            </div>
          </div>
        </li>
        <li class="w-4/5 text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb mx-auto">
          <div class="flex bg-white justify-between py-3">
            <p> member 1 </p>
            <div class="flex gap-2">
              <button>add</button>
              <button>reject</button>
            </div>
          </div>
        </li>
        <li class="w-4/5 text-center pb-002 last:pb-0 bg-gradient-to-r from-c-db to-c-lb mx-auto">
          <div class="flex bg-white justify-between py-3">
            <p> member 1 </p>
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