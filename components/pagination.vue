<template>
    <div class="join">
        <NuxtLink :to="firstUrl" :class="`join-item btn ${currentPage === startPage ? 'btn-disabled' : ''}`">
            First Page
        </NuxtLink>
        <NuxtLink v-for="page in pageLinks" :key="page.pageNumber" :to="page.location"
            :class="`join-item btn ${currentPage === page.pageNumber ? 'btn-disabled' : ''}`">{{ page.pageNumber }}
        </NuxtLink>
        <NuxtLink :to="lastUrl" :class="`join-item btn ${currentPage === totalPages ? 'btn-disabled' : ''}`">
            Last Page
        </NuxtLink>
    </div>
    <div class="w-full text-right">Total Results: {{ totalResults.toLocaleString() }}</div>
</template>

<script setup lang="ts">
import { RouteLocationPathRaw } from '.nuxt/vue-router';
interface PaginationProps {
    totalResults: number
    resultsPerPage: number
    currentPage: number
    urlBase: string
}

const props = defineProps<PaginationProps>()
const searchParams = useRequestURL().searchParams

const totalPages = computed(() => Math.ceil(props.totalResults / props.resultsPerPage))

const startPage = computed(() => Math.max(props.currentPage - 2, 1))
const endPage = computed(() => Math.min(startPage.value + 4, totalPages.value))

const pageLinks = computed(() => {
    return [...Array.from({ length: endPage.value - startPage.value + 1 }).keys()].map((_, index) => {
        const pageNumber = startPage.value + index
        return {
            pageNumber,
            location: getURLWithPage(pageNumber)
        }
    })
})

function getURLWithPage(page: number) {
    const queryObj: Record<string, string> = { page: page.toString() }

    for (let [key, value] of Object.entries(searchParams.entries())) {
        queryObj[key] = value
    }
    const route: RouteLocationPathRaw = {
        path: '/pokemon',
        query: queryObj
    }
    return route
}

const firstUrl = computed(() => getURLWithPage(1))
const lastUrl = computed(() => getURLWithPage(totalPages.value))


</script>

<style scoped></style>