import { ICharactor, MyChar } from 'type/types'

class MarvelService {
    readonly _apiBase: string = 'https://gateway.marvel.com:443/v1/public/'

    readonly _apiKey: string = 'apikey=49fb4240a3b93c08e343b4f177e3690'

    getResource = async (url: string): Promise<ICharactor> => {
        const result = await fetch(url)

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${result.status}`)
        }

        const data: Promise<ICharactor> = result.json()

        return data
    }

    getAllcharacters = () => {
        const url = `${this._apiBase}/characters?limit=5&${this._apiKey}`
        return this.getResource(url)
    }

    getOneCharacter = (id: number) => {
        const url = `${this._apiBase}/characters/${id}?${this._apiKey}`
        return this.getResource(url)
    }

    transformCharacter = (result: ICharactor): MyChar => {
        const char = result.data.results[0]
        return {
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}
export default MarvelService
