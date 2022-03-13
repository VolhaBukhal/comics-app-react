import React, { Component } from 'react'
import './charList.scss'
import { MyChar } from 'type/types'
import MarvelService from 'services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

type MyProps = {
    text: string
}

type MyState = {
    chars: MyChar[]
    loading: boolean
    error: boolean
}
class CharList extends Component<MyProps, MyState> {
    dataMarvel = new MarvelService()

    constructor(props: MyProps) {
        super(props)
        this.state = {
            chars: [],
            loading: true,
            error: false,
        }
    }

    componentDidMount() {
        this.updateData()
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onCharsloaded = (chars: MyChar[]) => {
        this.setState({
            chars,
            loading: false,
        })
    }

    updateData = async () => {
        try {
            const data = await this.dataMarvel.getAllcharacters()
            this.onCharsloaded(data)
        } catch {
            this.onError()
        }
    }

    renderItems = (arr: MyChar[]) => {
        return arr.map((item) => {
            const fallBack = !!(
                item.thumbnail.indexOf('image_not_available') !== -1
            )
            return (
                <li key={item.id} className="char__item">
                    {/* <li className="char__item char__item_selected"></li> */}
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={
                            fallBack
                                ? { objectFit: 'unset' }
                                : { objectFit: 'cover' }
                        }
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
    }

    render() {
        const { chars, loading, error } = this.state
        const { text } = this.props
        const items = this.renderItems(chars)
        const errorMessage = error ? <ErrorMessage /> : null
        const spinner = loading ? <Spinner loading={loading} /> : null
        const content = !(loading || error) ? items : null
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                    {text}
                </ul>
                <button
                    type="button"
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList
