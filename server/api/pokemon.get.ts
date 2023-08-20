import pokemonJson from '@/data/pokemon.json';
import { PokemonApiResponse, PokemonSearchResults } from '@/interfaces/pokemon';

export default defineEventHandler(async (event) => {
    const searchParams = getQuery(event)

    const searchValue = searchParams['searchValue'] as string ?? ''
    const sortMethod = searchParams['sortMethod'] ?? ''
    const pageSize = Number(searchParams['pageSize']) || 15
    const page = Number(searchParams['page']) || 1

    const colorFilter = Number(searchParams['colorFilter']) || 0
    const habitatFilter = Number(searchParams['habitatFilter']) || 0

    try {
        const allPokemonData: PokemonSearchResults[] = pokemonJson

        let filteredResults = allPokemonData.filter(pokemon => pokemon.name.includes(searchValue.toLowerCase()))

        if (colorFilter) {
            filteredResults = filteredResults.filter(pokemon => pokemon.color.id === colorFilter)
        }

        if (habitatFilter) {
            filteredResults = filteredResults.filter(pokemon => pokemon.habitat?.id === habitatFilter)
        }

        if (sortMethod) {
            filteredResults.sort((a, b) => {
                switch (sortMethod) {
                    case 'name': {
                        return a.name.localeCompare(b.name)
                    }
                    case 'weight:asc': {
                        return a.weight - b.weight
                    }
                    case 'weight:desc': {
                        return b.weight - a.weight
                    }
                    case 'height:asc': {
                        return a.height - b.height
                    }
                    case 'height:desc': {
                        return b.height - a.height
                    }
                    default: {
                        return 0
                    }
                }
            })
        }

        const count = filteredResults.length;
        const totalPages = Math.ceil(count / pageSize);
        const paginatedResults = filteredResults.slice((page - 1) * pageSize, page * pageSize);

        const apiResponse: PokemonApiResponse = { results: paginatedResults, count, page, totalPages }

        return apiResponse

    } catch (error) {
        console.log({ error })
        setResponseStatus(event, 500)
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong',
        })
    }
})