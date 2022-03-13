import React from 'react'
import ReactDOM from 'react-dom'
import './style/style.scss'
import MarvelService from 'services'
import { ICharactor } from 'type/types'
import App from './App'

const marvelData = new MarvelService()

// const getData = async () => {
//     const data: ICharactor = await marvelData.getAllcharacters()
//     console.log('all: ', data.data.results)

//     const single: ICharactor = await marvelData.getOneCharacter(1011334)
//     console.log('one: ', single.data.results)
// }
// getData()

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
