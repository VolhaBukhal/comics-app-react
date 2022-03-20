import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './charList.scss'
import { MyChar } from 'type/types'
import useMarvelService, { transformCharacter } from 'services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

type MyProps = {
    onCharSelected: (id: number) => void
}

function CharList({ onCharSelected }: MyProps) {
    const { loading, error, getAllcharacters } = useMarvelService()

    const [chars, setChars] = useState<MyChar[]>([])
    const [currentOffset, setCurrentOffset] = useState<number>(200)
    const [charEnded, setCharEnded] = useState<boolean>(false)
    const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false)

    const onCharsloaded = useCallback((newChars: MyChar[]) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true
        }

        setChars((charsData) => [...charsData, ...newChars])
        setNewItemsLoading(newItemsLoading)
        setCurrentOffset(currentOffset + 9)
        setCharEnded(ended)
    }, [])

    const updateData = useCallback(
        async (initial: boolean, offset = 200) => {
            if (initial) {
                setNewItemsLoading(false)
            } else {
                setNewItemsLoading(true)
            }

            getAllcharacters(offset).then((result) => {
                if (result && result !== null) {
                    onCharsloaded(result.data.results.map(transformCharacter))
                }
            })
        },
        [onCharsloaded, getAllcharacters]
    )

    useEffect(() => {
        updateData(true, currentOffset)
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
    const spinner =
        loading && !newItemsLoading ? <Spinner loading={loading} /> : null

    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {items}
            </ul>
            <button
                type="button"
                className="button button__main button__long"
                disabled={newItemsLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => updateData(false, currentOffset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList
