import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './charList.scss'
import { MyChar } from 'type/types'
import MarvelService from 'services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

type MyProps = {
    onCharSelected: (id: number) => void
}

function CharList({ onCharSelected }: MyProps) {
    const dataMarvel = useMemo(() => new MarvelService(), [])

    const [chars, setChars] = useState<MyChar[]>([])
    const [currentOffset, setCurrentOffset] = useState<number>(200)
    const [charEnded, setCharEnded] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false)

    const onCharListLoading = useCallback(() => {
        setNewItemsLoading(true)
    }, [])

    const onError = useCallback(() => {
        setLoading(false)
        setError(true)
    }, [])

    const onCharsloaded = useCallback(
        (newChars: MyChar[]) => {
            let ended = false
            if (newChars.length < 9) {
                ended = true
            }

            setChars((charsData) => [...charsData, ...newChars])
            setLoading(false)
            setNewItemsLoading(newItemsLoading)
            setCurrentOffset(currentOffset + 9)
            setCharEnded(ended)
        },
        [
            setChars,
            setLoading,
            setNewItemsLoading,
            setCurrentOffset,
            setCharEnded,
            newItemsLoading,
            currentOffset,
        ]
    )

    const updateData = useCallback(
        async (offset = 200) => {
            try {
                onCharListLoading()
                const data = await dataMarvel.getAllcharacters(offset)
                onCharsloaded(data)
            } catch {
                onError()
            }
        },
        [onCharListLoading, onCharsloaded, onError, dataMarvel]
    )

    useEffect(() => {
        updateData(currentOffset)
    }, [])

    const itemRefs: HTMLLIElement[] = []

    const setRef = (ref: HTMLLIElement) => {
        if (ref) {
            itemRefs.push(ref)
        }
    }

    const focusOnItem = (idx: number) => {
        itemRefs.forEach((item) => item.classList.remove('char__item_selected'))
        itemRefs[idx].classList.add('char__item_selected')
        itemRefs[idx].focus()
    }

    const renderItems = (arr: MyChar[]) => {
        return arr.map((item, i) => {
            const fallBack = !!(
                item.thumbnail.indexOf('image_not_available') !== -1
            )
            return (
                <li
                    key={item.id}
                    className="char__item"
                    ref={setRef}
                    onClick={() => {
                        onCharSelected(item.id)
                        focusOnItem(i)
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

    const items = renderItems(chars)
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
                onClick={() => updateData(currentOffset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList
