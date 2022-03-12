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

interface IComics {
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

interface IComicsItem {
    resourceURI: string
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

// {
//   "code": 200,
//   "status": "Ok",
//   "copyright": "© 2022 MARVEL",
//   "attributionText": "Data provided by Marvel. © 2022 MARVEL",
//   "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2022 MARVEL</a>",
//   "etag": "cb417587000b4a85a771e23b07a348cd03a9a0f8",
//   "data": {
//     "offset": 0,
//     "limit": 20,
//     "total": 1,
//     "count": 1,
//     "results": [
//       {
//         "id": 1011176,
//         "name": "Ajak",
//         "description": "",
//         "modified": "1969-12-31T19:00:00-0500",
//         "thumbnail": {
//           "path": "http://i.annihil.us/u/prod/marvel/i/mg/2/80/4c002f35c5215",
//           "extension": "jpg"
//         },
//         "resourceURI": "http://gateway.marvel.com/v1/public/characters/1011176",
//         "comics": {
//           "available": 4,
//           "collectionURI": "http://gateway.marvel.com/v1/public/characters/1011176/comics",
//           "items": [
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/comics/21175",
//               "name": "Incredible Hercules (2008) #117"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/comics/21324",
//               "name": "Incredible Hercules (2008) #118"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/comics/21505",
//               "name": "Incredible Hercules (2008) #119"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/comics/21707",
//               "name": "Incredible Hercules (2008) #120"
//             }
//           ],
//           "returned": 4
//         },
//         "series": {
//           "available": 1,
//           "collectionURI": "http://gateway.marvel.com/v1/public/characters/1011176/series",
//           "items": [
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/series/3762",
//               "name": "Incredible Hercules (2008 - 2010)"
//             }
//           ],
//           "returned": 1
//         },
//         "stories": {
//           "available": 8,
//           "collectionURI": "http://gateway.marvel.com/v1/public/characters/1011176/stories",
//           "items": [
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/46776",
//               "name": "Incredible Hercules (2008) #117",
//               "type": "cover"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/46777",
//               "name": "Interior #46777",
//               "type": "interiorStory"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/47097",
//               "name": "Incredible Hercules (2008) #118",
//               "type": "cover"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/47098",
//               "name": "Interior #47098",
//               "type": "interiorStory"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/47415",
//               "name": "Incredible Hercules (2008) #119",
//               "type": "cover"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/47416",
//               "name": "3 of 4 - Secret Invasion",
//               "type": "interiorStory"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/47721",
//               "name": "Incredible Hercules (2008) #120",
//               "type": "cover"
//             },
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/stories/47722",
//               "name": "4 of 4 - Secret Invasion",
//               "type": "interiorStory"
//             }
//           ],
//           "returned": 8
//         },
//         "events": {
//           "available": 1,
//           "collectionURI": "http://gateway.marvel.com/v1/public/characters/1011176/events",
//           "items": [
//             {
//               "resourceURI": "http://gateway.marvel.com/v1/public/events/269",
//               "name": "Secret Invasion"
//             }
//           ],
//           "returned": 1
//         },
//         "urls": [
//           {
//             "type": "detail",
//             "url": "http://marvel.com/characters/111/ajak?utm_campaign=apiRef&utm_source=49fb4240a3b93c08e343b4f177e3690a"
//           },
//           {
//             "type": "wiki",
//             "url": "http://marvel.com/universe/Ajak?utm_campaign=apiRef&utm_source=49fb4240a3b93c08e343b4f177e3690a"
//           },
//           {
//             "type": "comiclink",
//             "url": "http://marvel.com/comics/characters/1011176/ajak?utm_campaign=apiRef&utm_source=49fb4240a3b93c08e343b4f177e3690a"
//           }
//         ]
//       }
//     ]
//   }
// }
