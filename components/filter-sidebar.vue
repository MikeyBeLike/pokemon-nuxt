<template>
    <div class="mt-6">
        <h2 class="text-xl font-semibold text-gray-600">Search</h2>

        <div class="form-control w-full max-w-xs mb-4">
            <label for="search-by" class="label">
                <span class="label-text">Search for a Pokémon</span>
            </label>
            <input id="search-by" type="search" v-model.lazy="searchValue" placeholder="Type here"
                class="input input-bordered w-full max-w-xs" />
        </div>

        <h2 class="text-xl font-semibold text-gray-600">Filters</h2>

        <div class="form-control w-full max-w-xs mb-5">
            <label for="sort-by" class="label">
                <span class="label-text">Sort by:</span>
            </label>
            <select id="sort-by" class="select select-bordered" v-model="sortMethod">
                <option value="">Default</option>
                <option value="name">Name</option>
                <option value="weight:asc">Weight (asc)</option>
                <option value="weight:desc">Weight (desc)</option>
                <option value="height:asc">Height (asc)</option>
                <option value="height:desc">Height (desc)</option>
            </select>
        </div>

        <ClientOnly>
            <fieldset v-if="pokemonColors.length">
                <h3>Filter by Color</h3>
                <div class="max-h-40 overflow-scroll mb-4">
                    <div class="form-control">
                        <label for="color-default" class="label cursor-pointer">
                            <span class="label-text capitalize">Default</span>
                            <input type="radio" id="color-default" name="color-filter" class="radio checked:bg-primary"
                                :value="0" v-model="selectedColorId" />
                        </label>
                    </div>
                    <div v-for="color in pokemonColors" :key="color.id" class="form-control">
                        <label :for="`color-${color.id}`" class="label cursor-pointer">
                            <span class="label-text capitalize">{{ color.name }}</span>
                            <input type="radio" :id="`color-${color.id}`" name="color-filter`"
                                class="radio checked:bg-primary" :value="color.id" v-model="selectedColorId" />
                        </label>
                    </div>
                </div>
            </fieldset>

            <fieldset v-if="pokemonHabitats.length">
                <h3>Filter by Habitat</h3>
                <div class="max-h-40 overflow-scroll">
                    <div class="form-control">
                        <label for="habitat-default" class="label cursor-pointer">
                            <span class="label-text capitalize">Default</span>
                            <input type="radio" id="habitat-default" name="habitat-filter" class="radio checked:bg-primary"
                                :value="0" v-model="selectedHabitatId" />
                        </label>
                    </div>
                    <div v-for="habitat in pokemonHabitats" :key="habitat.id" class="form-control">
                        <label :for="`habitat-${habitat.id}`" class="label cursor-pointer">
                            <span class="label-text capitalize">{{ habitat.name }}</span>
                            <input type="radio" :id="`habitat-${habitat.id}`" name="habitat-filter"
                                class="radio checked:bg-primary" v-model="selectedHabitatId" :value="habitat.id" />
                        </label>
                    </div>
                </div>
            </fieldset>
        </ClientOnly>

    </div>
</template>

<script setup lang="ts">
import { NamedPokemonApiResource } from '../interfaces/pokemon-api';

interface PokemonFilterApiResponse {
    results: NamedPokemonApiResource[]
}

interface PokemonFilter {
    id: number
    name: string
}

const config = useRuntimeConfig()

const searchValue = defineModel()
const sortMethod = defineModel('sortMethod', {
    default: ''
})

const selectedColorId = defineModel('selectedColorId', {
    default: 0
})
const pokemonColors = ref<PokemonFilter[]>([])

const selectedHabitatId = defineModel('selectedHabitatId', {
    default: 0
})
const pokemonHabitats = ref<PokemonFilter[]>([])

async function getPokemonColors() {
    const { data } = await useFetch<PokemonFilterApiResponse>(config.public.pokemonApi + '/pokemon-color')
    if (data.value) {
        pokemonColors.value = data.value.results.map(mapResultsToFilter)
    }
}

async function getPokemonHabitat() {
    const { data } = await useFetch<PokemonFilterApiResponse>(config.public.pokemonApi + '/pokemon-habitat')
    if (data.value) {
        pokemonHabitats.value = data.value.results.map(mapResultsToFilter)
    }
}

function mapResultsToFilter(result: NamedPokemonApiResource): PokemonFilter {
    return {
        id: Number(extractPokemonIdFromUrl(result.url)),
        name: result.name
    }
}

getPokemonColors()
getPokemonHabitat()
</script>

<style scoped></style>