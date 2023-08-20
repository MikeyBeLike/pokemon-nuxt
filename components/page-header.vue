<template>
    <div class="navbar bg-base-100">
        <div class="container m-auto">
            <div class="flex-1">
                <NuxtLink href="/" class="btn btn-ghost normal-case text-xl">Pokémon NuxtJS</NuxtLink>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <NuxtLink href="/pokemon">Pokémon</NuxtLink>
                    </li>
                    <!-- <li><Web3Btn /></li> -->
                    <li>
                        <ThemeChange />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>