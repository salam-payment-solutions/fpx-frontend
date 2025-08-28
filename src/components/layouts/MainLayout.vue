<script setup lang="ts">
import { type MenuList, menuList } from '@/config/menu.config'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import MenueSvg from '@/assets/images/menu.svg'

const menu = ref<MenuList[]>(menuList)
const currentMenu = ref<MenuList | null>(null)
const route = useRoute()

// get current menu on navigate page
watchEffect(() => {
    currentMenu.value = menu.value.find((item) => item.path === route.path) || null
})
</script>

<template>
    <div class="main-layout flex h-screen w-screen">
        <div class="w-56 shadow-lg border-r bg-primary text-primary-foreground">
            <div class="p-4 font-bold h-14">Salam Payment</div>
            <div class="mt-4 px-2">
                <router-link v-for="(item, index) in menu" :key="index" :to="item.path">
                    <div
                        class="px-4 mt-1 rounded py-2 hover:bg-secondary/70"
                        :class="{
                            'bg-secondary text-secondary-foreground':
                                currentMenu?.path === item.path,
                        }"
                    >
                        {{ item.title }}
                    </div>
                </router-link>
            </div>
        </div>
        <div class="w-96 flex flex-col flex-1">
            <div class="h-14 shadow-lg border-b flex justify-between items-center">
                <Button variant="ghost" class="mx-2">
                    <MenueSvg class="w-6 h-6" />
                </Button>
            </div>
            <div class="flex-1 overflow-auto bg-gray-100">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
