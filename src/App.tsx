import React, { Component } from 'react'
import decoration from 'assets/img/vision.png'
import AppHeader from './components/appHeader/AppHeader'
import RandomChar from './components/randomChar/RandomChar'
import CharList from './components/charList/CharList'
import CharInfo from './components/charInfo'

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
        const { selectedChar } = this.state
        this.setState({ selectedChar: id })
        console.log('from App:', id)
    }

    render() {
        const { selectedChar } = this.state
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <RandomChar text="try it" />
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected} />
                        <CharInfo charId={selectedChar} />
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
