import { ICharactor, MyChar, IMainCharactorInfo } from 'type/types'

class MarvelService {
    readonly _apiBase: string = 'https://gateway.marvel.com:443/v1/public/'

    readonly _apiKey: string = 'apikey=49fb4240a3b93c08e343b4f177e3690a'

    getResource = async (url: string): Promise<ICharactor> => {
        const result = await fetch(url)

        if (!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status ${result.status}`)
        }

        const data: Promise<ICharactor> = result.json()

        return data
    }

    getAllcharacters = async () => {
        const url = `${this._apiBase}/characters?limit=9&${this._apiKey}`
        const res = await this.getResource(url)
        return res.data.results.map(this.transformCharacter)
    }

    getOneCharacter = async (id: number) => {
        const url = `${this._apiBase}/characters/${id}?${this._apiKey}`
        const res = await this.getResource(url)
        return this.transformCharacter(res.data.results[0])
    }

    transformCharacter = (result: IMainCharactorInfo): MyChar => {
        const char = result
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        }
    }
}
export default MarvelService
