import React, { Component } from 'react'
import decoration from 'assets/img/vision.png'
import AppHeader from './components/appHeader/AppHeader'
import RandomChar from './components/randomChar/RandomChar'
import CharList from './components/charList/CharList'
import CharInfo from './components/charInfo'
import ErrorBoundary from './components/errorBoundary'

type MyState = {
    selectedChar: number
}

class App extends Component<unknown, MyState> {
    constructor(props = {}) {
        super(props)
        this.state = {
            selectedChar: 0,
        }
    }

    onCharSelected = (id: number) => {
        this.setState({ selectedChar: id })
    }

    render() {
        const { selectedChar } = this.state
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected} />
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img
                        className="bg-decoration"
                        src={decoration}
                        alt="vision"
                    />
                </main>
            </div>
        )
    }
}

export default App
