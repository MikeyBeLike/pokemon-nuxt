<template>
    <div class="hero min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-2xl">
                <h1 class="text-5xl font-bold mb-8">Pokémon + NuxtJS</h1>
                <article class="text-left">

                    <h5 class="text-2xl">Stack</h5>
                    <ul class="list-disc mb-5">
                        <li><a href="https://nuxt.com/" target="_blank" class="link">NuxtJS</a> 3.6.5
                        </li>
                        <li><a href="https://www.typescriptlang.org/" target="_blank" class="link">Typescript</a></li>
                        <li><a href="https://tailwindcss.com/" target="_blank" class="link">TailwindCSS</a> w/ <a
                                href="https://daisyui.com/" target="_blank" class="link">DaisyUI</a></li>
                        <!-- <li>Web3: WalletConnect, Wagmi</li> -->
                    </ul>

                    <h5 class="text-2xl">Description</h5>
                    <p class="mb-5">
                        This app allows a user to list all Pokémon in a grid based format, it offers the features of
                        pagination, filtering against certain traits, searching for specific Pokemon & also sorting by some
                        specific traits.
                    </p>

                    <h5 class="text-2xl">Challenges</h5>
                    <p class="mb-5">
                        The main challenge was finding a public API, that already had sorting, searching, filtering &
                        pagination built in - which also did not have rate limiting restrictions in place.
                    </p>

                    <p class="mb-5">
                        Because of this challenge I had to find an API that had the data I needed and had it freely
                        available and build my own abstraction of the API I required for the task. Luckily the Pokemon API
                        is freely available on Github, but unfortunately the data is not relational (found out the long
                        way).
                    </p>
                    <p class="mb-5">
                        Essentially I had to write a script that would allow me to fetch all of the related relevant data
                        and stitch it together into a .json file. <a class="underline"
                            href="https://gist.github.com/MikeyBeLike/6e43dc7b074eb84733cb59aae9fb4958" target="_blank">This
                            code can be found here</a>.
                    </p>

                </article>

                <NuxtLink to="/pokemon" class="btn btn-primary">View Pokémon</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>