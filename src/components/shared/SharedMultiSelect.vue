<script setup lang="ts">
import type { Dropdown } from '@/models/shared/dropdown.model'
import { Checkbox } from '../ui/checkbox'
import { CommandItem } from '../ui/command'
import ChevronSvg from '@/assets/images/chevron.svg'
import { Button } from '../ui/button'
import { computed } from 'vue'

const { placeholder, options, modelValue } = defineProps<{
    modelValue: Dropdown<string>[]
    placeholder?: string
    options: Dropdown<string>[]
    popoverTriggerClass?: string
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: Dropdown<string>[]): void
}>()

const isAllSelected = computed(() => {
    return options.length > 0 && modelValue.length === options.length
})

const toggleIsSelectedAll = () => {
    if (isAllSelected.value) {
        emit('update:modelValue', [])
    } else {
        emit('update:modelValue', options)
    }
}
</script>

<template>
    <Popover>
        <PopoverTrigger
            class="border rounded-md p-2 flex flex-wrap gap-2 py-1 px-3 min-h-[2.25rem] items-center"
            :class="popoverTriggerClass"
        >
            <span v-if="modelValue.length === 0" class="text-gray-500 text-sm h-fit">{{
                placeholder
            }}</span>
            <span
                v-for="item in modelValue"
                :key="item.value"
                class="px-2 py-1 bg-primary text-white rounded-md text-xs flex items-center gap-2"
            >
                <span>{{ item.label }}</span>
            </span>
            <ChevronSvg class="w-3 h-3 ml-auto" />
        </PopoverTrigger>

        <PopoverContent>
            <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandGroup>
                        <Button
                            variant="ghost"
                            @click="() => toggleIsSelectedAll()"
                            class="px-2 w-full justify-start font-normal mb-1"
                        >
                            <Checkbox :modelValue="isAllSelected" />
                            <span>Select All</span>
                        </Button>
                        <CommandItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            @select="
                                (value) => {
                                    let newValue = [...modelValue]

                                    if (
                                        newValue.some((item) => item.value === value.detail.value)
                                    ) {
                                        newValue = newValue.filter(
                                            (item) => item.value !== option.value,
                                        )
                                    } else {
                                        newValue.push(option)
                                    }

                                    emit('update:modelValue', newValue)
                                }
                            "
                            class="cursor-pointer"
                        >
                            <Checkbox
                                :modelValue="modelValue.some((item) => item.value === option.value)"
                            />
                            {{ option.label }}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
</template>
