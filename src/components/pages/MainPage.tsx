import React, { useState } from 'react'
import decoration from 'assets/img/vision.png'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import ErrorBoundary from '../errorBoundary'
import RandomChar from '../randomChar/RandomChar'

function MainPage() {
    const [selectedChar, setSelectedChar] = useState<number>(0)

    const onCharSelected = (id: number) => {
        setSelectedChar(id)
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage
