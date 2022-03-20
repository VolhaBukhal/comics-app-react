import React, { FC, useEffect, useState } from 'react'
import './randomChar.scss'
import mjolnir from 'assets/img/mjolnir.png'
import useMarvelService from 'services/MarvelService'
import { MyChar } from 'type/types'
import Spinner from '../spinner/Spinner'

import ErrorMessage from '../errorMessage'

function View({ char, cutDescription }: MyFProps) {
    const { name, description, thumbnail, homepage, wiki } = char
    const callBack = !!(thumbnail.indexOf('image_not_available') !== -1)

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className={
                    callBack ? 'randomchar__img_fallback' : 'randomchar__img'
                }
            />

            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {cutDescription(description)}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

type MyState = {
    char: MyChar
    loading: boolean
    error: boolean
}

// type MyProps = {
//     text: string
// }

type MyFProps = {
    char: MyChar
    cutDescription: (text: string) => string
}

function RandomChar() {
    const [char, setCahr] = useState<MyChar>({
        id: 0,
        name: '',
        description: '',
        thumbnail: '',
        homepage: '',
        wiki: '',
    })

    const { error, loading, getOneCharacter, clearError } = useMarvelService()

    // const onError = () => {
    //     setError(true)
    //     setLoading(false)
    // }

    const onCharLoaded = (newChar: MyChar) => {
        setCahr(newChar)
    }

    function updateChar() {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getOneCharacter(id).then((result) => {
            if (result && result !== null) {
                onCharLoaded(result[0])
            }
        })
    }

    useEffect(() => {
        updateChar()
    }, [])

    const cutDescription = (text: string) => {
        if (text) {
            if (text.length > 200) {
                const x = text.slice(0, 200)
                return `${x}...`
            }
            return text
        }
        return 'There is no descriptiion of this character'
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner loading={loading} /> : null
    const content = !(loading || error) ? (
        <View char={char} cutDescription={cutDescription} />
    ) : null

    return (
        <div className="randomchar">
            {/* {loading ? (
                    <ClipLoader
                        color="darkred"
                        loading={loading}
                        size={100}
                        css={override}
                    />
                ) : (
                    <View char={char} cutDescription={this.cutDescription} />
                )} */}
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button
                    type="button"
                    className="button button__main"
                    onClick={updateChar}
                >
                    <div className="inner">Try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    )
}

export default RandomChar
