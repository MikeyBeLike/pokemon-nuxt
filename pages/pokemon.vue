<template>
    <div class="flex min-h-screen">
        <div class="container flex">
            <aside class="w-full lg:w-1/4 px-6">
                <FilterSidebar v-model="searchValue" v-model:selected-color-id="colorFilter"
                    v-model:selected-habitat-id="habitatFilter" v-model:sort-method="sortMethod" />
            </aside>
            <main class="w-full lg:w-3/4 px-6">
                <template v-if="error">
                    some error shown
                </template>
                <template v-else-if="data">
                    <div class="flex py-4 justify-center flex-col items-center">
                        <Pagination :currentPage="Number(page)" :resultsPerPage="pageSize" :totalResults="data.count"
                            urlBase="/pokemon" />
                    </div>

                    <template v-if="pending">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <CardSkeleton v-for="n in 15" :key="n" />
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            <CardSkeleton v-for="n in 15" :key="n" />
                        </div>
                    </template>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <PokemonCards :pokemonCards="data.results" />
                    </div>

                    <div class="flex py-4 justify-center flex-col items-center">
                        <Pagination :currentPage="Number(page)" :resultsPerPage="pageSize" :totalResults="data.count"
                            urlBase="/pokemon" />
                    </div>
                </template>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
const pageSize = 15

const searchParams = useRequestURL().searchParams

const route = useRoute()
const router = useRouter()

const searchValue = ref('')
const colorFilter = ref(0)
const habitatFilter = ref(0)
const sortMethod = ref('')

onMounted(() => {
    searchValue.value = searchParams.get('searchValue') ?? ''
    sortMethod.value = searchParams.get('sortMethod') ?? ''
    colorFilter.value = Number(searchParams.get('colorFilter')) ?? 0
    habitatFilter.value = Number(searchParams.get('habitatFilter')) ?? 0
})

const page = computed(() => route.query['page'] as string ?? '1')

const requestParams = computed(() => {
    const params = {
        page: page.value,
        searchValue: searchValue.value,
        colorFilter: colorFilter.value,
        habitatFilter: habitatFilter.value,
        sortMethod: sortMethod.value
    }

    return Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) => value || value === '0'
        )
    );
})
const searchQuery = computed(() => {
    return Object.entries(requestParams.value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
})

const { data, error, pending } = await useFetch(() => `/api/pokemon?${searchQuery.value}`, {
    onRequest() {
        router.replace({ query: requestParams.value })
    }
})
</script>

<style scoped></style>