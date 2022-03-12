import { ICharactor } from 'type/types'

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

    getAllcharacters = () => {
        const url = `${this._apiBase}/characters?limit=5&${this._apiKey}`
        return this.getResource(url)
    }

    getOneCharacter = (id: number) => {
        const url = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=49fb4240a3b93c08e343b4f177e3690a`
        return this.getResource(url)
    }
}
export default MarvelService
