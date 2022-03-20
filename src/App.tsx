import React, { FC, useState } from 'react'
import decoration from 'assets/img/vision.png'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppHeader from './components/appHeader/AppHeader'
import RandomChar from './components/randomChar/RandomChar'
import CharList from './components/charList/CharList'
import CharInfo from './components/charInfo'
import ErrorBoundary from './components/errorBoundary'
import ComicsList from './components/comicsList'

function App() {
    const [selectedChar, setSelectedChar] = useState<number>(0)

    const onCharSelected = (id: number) => {
        setSelectedChar(id)
    }
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route path="/" exact>
                            <ErrorBoundary>
                                <RandomChar />
                            </ErrorBoundary>
                            <div className="char__content">
                                <CharList onCharSelected={onCharSelected} />
                                <ErrorBoundary>
                                    <CharInfo charId={selectedChar} />
                                </ErrorBoundary>
                            </div>
                            <img
                                className="bg-decoration"
                                src={decoration}
                                alt="vision"
                            />
                        </Route>
                        <Route path="/comics" exact>
                            <ComicsList />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App
