<template>
    <Pagination
        v-slot="{ page }"
        :items-per-page="value.pageSize"
        :total="value.total"
        :page="value.currentPage"
        @update:page="
            (newValue: number) => emit('update:value', { ...value, currentPage: newValue })
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

const { value } = defineProps<{
    value: Pagination
}>()

const emit = defineEmits(['update:value'])
</script>
