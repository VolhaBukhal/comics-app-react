import { ICharactor, MyChar, IMainCharactorInfo } from 'type/types'
import { getLeadingCommentRanges } from 'typescript'

import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp()

    const apiBase = 'https://gateway.marvel.com:443/v1/public/'

    const apiKey = 'apikey=49fb4240a3b93c08e343b4f177e3690a'

    const charOffset = 200

    // const getResource = async (url: string): Promise<ICharactor> => {
    //     const result = await fetch(url)

    //     if (!result.ok) {
    //         throw new Error(`Couldn't fetch ${url}, status ${result.status}`)
    //     }

    //     const data: Promise<ICharactor> = result.json()

    //     return data
    // }

    function transformCharacter(result: IMainCharactorInfo): MyChar {
        const char = result
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics,
        }
    }

    const getAllcharacters = async (offset: number = charOffset) => {
        const url = `${apiBase}/characters?limit=9&&offset=${offset}&${apiKey}`

        const res = await request(url)

        if (res) {
            return res.data.results.map(transformCharacter)
        }
        return null
    }

    const getAllData = async () => {
        const url = `${apiBase}/characters?limit=5&&offset=202&${apiKey}`
        const res = await request(url)
        console.log(res)

        if (res) {
            return res.data.results.map(transformCharacter)
        }
        return null
    }

    const getOneCharacter = async (id: number) => {
        const url = `${apiBase}/characters/${id}?${apiKey}`
        const res = await request(url)
        if (res) {
            return res.data.results.map(transformCharacter)
        }
        return null
    }

    return { loading, error, getAllcharacters, getOneCharacter, clearError }
}
export default useMarvelService
