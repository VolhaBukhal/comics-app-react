export interface ICharactor {
    code: number
    status: string
    copyright: string
    data: {
        offset: number
        limit: number
        total: number
        results: IMainCharactorInfo[]
    }
}

export interface IMainCharactorInfo {
    id: number
    name: string
    description: string
    modified: string
    thumbnail: {
        path: string
        extension: string
    }
    resourceURI: string
    comics: IComics
    series: ISeries
    stories: IStories
    events: IEvents
    urls: IUrlsItem[]
}

export interface IComics {
    available: number
    collectionURI: string
    items: IComicsItem[]
    returned: number
}

interface ISeries {
    available: number
    collectionURI: string
    items: ISeriesItem[]
    returned: number
}

interface IStories {
    available: number
    collectionURI: string
    items: IstoriesItem[]
}

interface IEvents {
    available: number
    collectionURI: string
    items: IEventsItem[]
    returned: number
}

export interface IComicsItem {
    resourceURL: string
    name: string
}

interface ISeriesItem {
    resourceURI: string
    name: string
}

interface IstoriesItem {
    resourceURI: string
    name: string
    type: string
}

interface IEventsItem {
    resourceURI: string
    name: string
}

interface IUrlsItem {
    type: string
    url: string
}

export interface MyChar {
    id: number
    name: string
    description: string
    thumbnail: string
    homepage: string
    wiki: string
    comics?: IComics
}

export interface IDataComics {
    code: number
    status: string
    data: {
        offset: number
        limit: number
        total: number
        results: IMainComicsInfo[]
    }
}

interface IPrices {
    type: string
    price: number
}

export interface IMainComicsInfo {
    id: number
    title: string
    issueNumber: number
    name: string
    description: string
    pageCount: number
    textObjects: { language: string }
    variantDescription: string
    modified: string
    resourceURI: string
    comics: IComics
    urls: IUrlsItem[]
    prices: IPrices[]
    thumbnail: {
        path: string
        extension: string
    }
}

export interface MyComic {
    id: number
    title: string
    description: string
    pageCount: string
    language: string
    thumbnail: string
    price: number
}
