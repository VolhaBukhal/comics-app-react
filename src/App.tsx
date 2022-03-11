import React from 'react'
import decoration from 'assets/img/vision.png'

import AppHeader from './components/appHeader/AppHeader'
import RandomChar from './components/randomChar/RandomChar'
import CharList from './components/charList/CharList'
import CharInfo from './components/charInfo'

function App() {
    return (
        <div className="app">
            <AppHeader />
            <main>
                <RandomChar />
                <div className="char__content">
                    <CharList />
                    <CharInfo />
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App
