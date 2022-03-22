import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import './comicsList.scss'
import xMen from 'assets/img/x-men.png'
import { MyChar, IDataComics, IMainComicsInfo } from 'type/types'
import useMarvelService from 'services'
import { render } from '@testing-library/react'
import ErrorMessage from 'components/errorMessage'
import Spinner from 'components/spinner'

function ComicsList() {
    const { loading, error, getAllComics } = useMarvelService()

    const [comics, setComics] = useState<IMainComicsInfo[]>([])
    const [currentOffset, setCurrentOffset] = useState<number>(100)
    const [charEnded, setCharEnded] = useState<boolean>(false)
    const [newItemsLoading, setNewItemsLoading] = useState<boolean>(false)

    const onComicsLoaded = useCallback((newComics: IMainComicsInfo[]) => {
        let ended = false
        if (newComics.length < 8) {
            ended = true
        }
        setComics((comicsData) => [...comicsData, ...newComics])
        setNewItemsLoading(newItemsLoading)
        setCurrentOffset(currentOffset + 8)
        setCharEnded(ended)
    }, [])

    const updateData = useCallback(
        async (initial: boolean, offset = 100) => {
            if (initial) {
                setNewItemsLoading(false)
            } else {
                setNewItemsLoading(true)
            }

            getAllComics(offset).then((result) => {
                if (result && result !== null) {
                    onComicsLoaded(result.data.results)
                }
            })
        },
        [onComicsLoaded, getAllComics]
    )

    useEffect(() => {
        updateData(true, currentOffset)
    }, [])

    const renderItems = (arr: IMainComicsInfo[]) => {
        return arr.map((item, i) => {
            const fallBack = !!(
                item.thumbnail.path.indexOf('image_not_available') !== -1
            )
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img
                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                            alt={item.title}
                            className="comics__item-img"
                            style={
                                fallBack
                                    ? { objectFit: 'unset' }
                                    : { objectFit: 'cover' }
                            }
                        />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">
                            {item.prices[0].price}$
                        </div>
                    </Link>
                </li>
                // <li
                //     key={item.id}
                //     className="char__item"
                //     // onClick={() => {
                //     //     onCharSelected(item.id)
                //     //     focusOnItem(i)
                //     // }}
                //     role="presentation"
                // >
                //     <img
                //         src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                //         alt={item.title}
                //         style={
                //             fallBack
                //                 ? { objectFit: 'unset' }
                //                 : { objectFit: 'cover' }
                //         }
                //     />
                //     <div className="char__name">{item.name}</div>
                // </li>
            )
        })
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner =
        loading && !newItemsLoading ? <Spinner loading={loading} /> : null

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">{renderItems(comics)}</ul>
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

export default ComicsList
