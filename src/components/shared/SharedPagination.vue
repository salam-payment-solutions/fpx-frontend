<template>
    <p class="text-sm text-gray-500 mr-4">
        Showing {{ value.currentPage * value.pageSize - value.pageSize + 1 }} -
        {{ Math.min(value.currentPage * value.pageSize, value.total) }} of {{ value.total }}
    </p>
    <Select
        :model-value="value.pageSize"
        @update:model-value="
            (newValue) => emit('update:modelValue', { ...value, pageSize: newValue as number })
        "
    >
        <SelectTrigger>
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectItem
                v-for="pageSize in pageSizes"
                :key="`page-size-${pageSize}`"
                :value="pageSize"
                >{{ pageSize }}</SelectItem
            >
        </SelectContent>
    </Select>
    <Pagination
        v-slot="{ page }"
        :items-per-page="value.pageSize"
        :total="value.total"
        :page="value.currentPage"
        @update:page="
            (newValue: number) => emit('update:modelValue', { ...value, currentPage: newValue })
        "
    >
        <PaginationContent v-slot="{ items }">
            <PaginationPrevious />

            <template v-for="(item, index) in items" :key="index">
                <PaginationItem
                    v-if="item.type === 'page'"
                    :value="item.value"
                    :is-active="item.value === page"
                >
                    {{ item.value }}
                </PaginationItem>
            </template>

            <PaginationEllipsis :index="4" />

            <PaginationNext />
        </PaginationContent>
    </Pagination>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Pagination } from '@/models/shared/pagination.model.ts'
import { Select, SelectTrigger } from '../ui/select'

const { value } = defineProps<{
    value: Pagination
}>()
const pageSizes = [10, 20, 50, 100]

const emit = defineEmits<{
    (e: 'update:modelValue', value: Pagination): void
}>()
</script>
