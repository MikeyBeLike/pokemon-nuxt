<template>
    <div v-for="pokemon in pokemonCards" :key="pokemon.id" class="card card-compact w-full bg-base-100 shadow-xl">
        <figure>
            <nuxt-img lass="card-side" :src="pokemon.image" :width="100" :height="100" :alt="pokemon.name" />
        </figure>
        <div class="card-body">
            <h2 class="card-title capitalize self-center">{{ pokemon.name }}</h2>
            <p>Weight: {{ pokemon.weight.toLocaleString() }}, Height: {{ pokemon.height }}</p>
            <p>Color: {{ pokemon.color.name }}</p>
            <p v-if="pokemon.habitat">Habitat: {{ pokemon.habitat.name }}</p>
            <p v-if="pokemon.types.length">Type(s): {{ pokemon.types.map(type => type.name).join(', ') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PokemonSearchResults } from 'interfaces/pokemon';

defineProps<{ pokemonCards: PokemonSearchResults[] }>()
</script>

<style scoped></style>