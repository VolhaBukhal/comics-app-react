import React, { Component, createRef } from 'react'
import './charList.scss'
import { MyChar } from 'type/types'
import MarvelService from 'services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

type MyProps = {
    onCharSelected: (id: number) => void
}

type MyState = {
    chars: MyChar[]
    loading: boolean
    error: boolean
    newItemsLoading: boolean
    currentOffset: number
    charEnded: boolean
}
class CharList extends Component<MyProps, MyState> {
    dataMarvel = new MarvelService()

    itemRefs: HTMLLIElement[] = []

    constructor(props: MyProps) {
        super(props)
        this.state = {
            chars: [],
            loading: true,
            error: false,
            newItemsLoading: false,
            currentOffset: 200,
            charEnded: false,
        }
    }

    componentDidMount() {
        const { currentOffset } = this.state

        this.updateData(currentOffset)
    }

    updateData = async (offset: number) => {
        try {
            this.onCharListLoading()
            const data = await this.dataMarvel.getAllcharacters(offset)
            this.onCharsloaded(data)
        } catch {
            this.onError()
        }
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true,
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    onCharsloaded = (newChars: MyChar[]) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }
        this.setState(({ chars, currentOffset }) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemsLoading: false,
            currentOffset: currentOffset + 9,
            charEnded: ended,
        }))
    }

    setRef = (ref: HTMLLIElement) => {
        if (ref) {
            this.itemRefs.push(ref)
        }
    }

    focusOnItem = (idx: number) => {
        this.itemRefs.forEach((item) =>
            item.classList.remove('char__item_selected')
        )
        this.itemRefs[idx].classList.add('char__item_selected')
        this.itemRefs[idx].focus()
    }

    renderItems = (arr: MyChar[]) => {
        const { onCharSelected } = this.props
        return arr.map((item, i) => {
            const fallBack = !!(
                item.thumbnail.indexOf('image_not_available') !== -1
            )
            return (
                <li
                    key={item.id}
                    className="char__item"
                    ref={this.setRef}
                    onClick={() => {
                        onCharSelected(item.id)
                        this.focusOnItem(i)
                    }}
                    role="presentation"
                >
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
        const {
            chars,
            loading,
            error,
            newItemsLoading,
            currentOffset,
            charEnded,
        } = this.state
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
                </ul>
                <button
                    type="button"
                    className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{ display: charEnded ? 'none' : 'block' }}
                    onClick={() => this.updateData(currentOffset)}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList
