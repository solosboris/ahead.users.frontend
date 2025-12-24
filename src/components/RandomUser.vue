<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getRandom } from '../services/rest'
import type { Column, User } from '../types/SortableTable.types'
import { columns, tableColorClasses } from '../types/SortableTable.types'
import SortableTable from './SortableTable.vue'

const tableColumns: Column<User>[] = columns
const colorClasses: Record<string, string> = tableColorClasses
const route = useRoute()
const id = Number(route.params.id)

const users = ref<User[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await getRandom()
    users.value.push(response.data)
  } catch (e) {
    error.value = 'RandomUser failed to load user'
  } finally {
    loading.value = false
  }
})
</script>

<template>
    <h2 class="text-xl font-semibold mb-4">
        Random&nbsp;user
    </h2>
    <h2 class="text-xl font-semibold mb-4">
        <a href="/users">All&nbsp;users</a>
    </h2>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="text-red-600">
        {{ error }}
    </p>

    <SortableTable v-if="users.length" :items="users" :columns="tableColumns">
        <template #cell-color="{ item }">
        <span class="inline-block rounded px-2 py-1 text-xs font-semibold text-white cursor-pointer"
            :class="colorClasses[item.color] || 'bg-gray-400'">
            {{ item.color }}
        </span>
        </template>
    </SortableTable>
</template>