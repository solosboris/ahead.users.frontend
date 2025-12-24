<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Column } from '../types/SortableTable.types'

const props = defineProps<{
  items: any[]
  columns: Column<any>[]
  rowKey?: string
}>()

const resolvedRowKey = computed(() => props.rowKey ?? 'id')
const sortKey = ref<keyof any | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const emit = defineEmits<{
  (e: 'row-click', item: any): void
}>()

function sortBy(key: keyof any) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const sortedItems = computed(() => {
  if (!sortKey.value) {
    return props.items
  }
  return [...props.items].sort(
    (a, b) => {
        const value1 = a[sortKey.value!]
        const value2 = b[sortKey.value!]
        if (value1 == null) {
          return 1
        }
        if (value2 == null) {
          return -1
        }
        if (typeof value1 === 'number' && typeof value2 === 'number') {
          return sortOrder.value === 'asc' ?
                  value1 - value2 :
                  value2 - value1
        }
        return sortOrder.value === 'asc' ?
          String(value1).localeCompare(String(value2)) :
          String(value2).localeCompare(String(value1))
  })
})
</script>

<template>
  <div class="relative max-h-[500px] overflow-auto rounded-lg border border-gray-200 shadow-sm">
    <table class="min-w-full border-collapse text-sm">
      <thead class="sticky top-0 z-10 bg-gray-100">
        <tr>
          <th v-for="col in columns" :key="String(col.key)" @click="sortBy(col.key)"
              class="cursor-pointer select-none whitespace-nowrap px-4 py-3 text-left font-semibold text-gray-700 border-b border-gray-300 hover:bg-gray-200">
            <div class="flex items-center gap-2">
              {{ col.label }}
              <span v-if="sortKey === col.key" class="text-xs">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in sortedItems" :key="item[resolvedRowKey] ?? JSON.stringify(item)" @click="emit('row-click', item)"
            class="cursor-pointer odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors">
          <td v-for="column in columns" :key="String(column.key)"
            class="px-4 py-2 border-b text-gray-800">
            <slot :name="`cell-${String(column.key)}`" :item="item">
              {{ item[column.key] }}
            </slot> 
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>