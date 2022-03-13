import React, { FC, Component } from 'react'
import './randomChar.scss'
import mjolnir from 'assets/img/mjolnir.png'
import MarvelService from 'services/MarvelService'
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

type MyProps = {
    text: string
}

type MyFProps = {
    char: MyChar
    cutDescription: (text: string) => string
}

class RandomChar extends Component<MyProps, MyState> {
    marvelData = new MarvelService()

    constructor(props: MyProps) {
        super(props)
        this.state = {
            char: {
                id: 0,
                name: '',
                description: '',
                thumbnail: '',
                homepage: '',
                wiki: '',
            },
            loading: true,
            error: false,
        }
        console.log('constructor')
    }

    componentDidMount() {
        console.log('mount')

        this.updateChar()
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onCharLoaded = (char: MyChar) => {
        this.setState({ char, loading: false })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        console.log(id)
        this.marvelData
            .getOneCharacter(id)
            .then((result) => {
                this.onCharLoaded(result)
            })
            .catch(this.onError)
    }

    cutDescription = (text: string) => {
        if (text) {
            if (text.length > 200) {
                const x = text.slice(0, 200)
                return `${x}...`
            }
            return text
        }
        return 'There is no descriptiion of this character'
    }

    render() {
        console.log('render')
        const { char, loading, error } = this.state
        const { text } = this.props
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner loading={loading} /> : null
        const content = !(loading || error) ? (
            <View char={char} cutDescription={this.cutDescription} />
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
                        onClick={this.updateChar}
                    >
                        <div className="inner">{text}</div>
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
}

export default RandomChar
