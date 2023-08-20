<template>
    <button @click="handleThemeChange">{{ isDark ? '🌞' : '🌚' }}</button>
</template>

<script setup lang="ts">
const isDark = ref(true)

function handleThemeChange() {
    isDark.value = !isDark.value
    useHead({
        htmlAttrs: {
            'data-theme': isDark.value ? 'dark' : 'light'
        }
    })
}
</script>

<style scoped></style>