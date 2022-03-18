import React, { FC, useState } from 'react'
import decoration from 'assets/img/vision.png'
import AppHeader from './components/appHeader/AppHeader'
import RandomChar from './components/randomChar/RandomChar'
import CharList from './components/charList/CharList'
import CharInfo from './components/charInfo'
import ErrorBoundary from './components/errorBoundary'

function App() {
    const [selectedChar, setSelectedChar] = useState<number>(0)

    const onCharSelected = (id: number) => {
        setSelectedChar(id)
    }
    return (
        <div className="app">
            <AppHeader />
            <main>
                <ErrorBoundary>
                    <RandomChar />
                </ErrorBoundary>
                <div className="char__content">
                    <CharList onCharSelected={onCharSelected} />
                    {/* <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary> */}
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" />
            </main>
        </div>
    )
}

export default App
