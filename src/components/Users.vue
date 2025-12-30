<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Column, User } from '../types/SortableTable.types'
import { columns, tableColorClasses } from '../types/SortableTable.types'
import SortableTable from './SortableTable.vue'
import { useUsersStore } from '../stores/users'

const tableColumns: Column<User>[] = columns
const colorClasses: Record<string, string> = tableColorClasses
const router = useRouter()
const store = useUsersStore()

onMounted(() => {
  if (!store.users.length) {
    store.load()
  }
})

function goToRandom() {
  router.push(`/random`)
}
</script>

<template>
  <h2 class="text-xl font-semibold mb-4">Users</h2>
  <div>
    <button @click="store.load" :disabled="store.loading"
      class="mb-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
      Reload
    </button>
    <button @click="store.randomUser" :disabled="store.loading"
      class="mb-4 rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
      Random
    </button>
  </div>
  <p v-if="store.loading">Loading...</p>
  <p v-if="store.error" class="text-red-600">
    {{ store.error }}
  </p>

  <SortableTable v-if="store.users.length" :items="store.users" :columns="tableColumns" @row-click="goToRandom">
    <template #cell-color="{ item }">
      <span class="inline-block rounded px-2 py-1 text-xs font-semibold text-white cursor-pointer"
        :class="colorClasses[item.color] || 'bg-gray-400'">
        {{ item.color }}
      </span>
    </template>
  </SortableTable>

</template>