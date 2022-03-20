import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './singleComic.scss'
import xMen from 'assets/img/x-men.png'
import useMarvelService, { transformComic } from 'services/MarvelService'
import { MyComic } from 'type/types'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'

function SingleComic() {
    const params = useParams()
    const { comicId } = params

    const { error, loading, getOneComic, clearError } = useMarvelService()
    const [comic, setComic] = useState<MyComic>({
        id: 0,
        title: '',
        description: '',
        pageCount: '',
        language: '',
        thumbnail: '',
        price: 0,
    })

    const onComicLoaded = (newComic: MyComic) => {
        setComic(newComic)
    }

    const updateChar = () => {
        if (!comicId) {
            return
        }
        clearError()
        getOneComic(+comicId).then((result) => {
            if (result && result !== null) {
                onComicLoaded(transformComic(result.data.results[0]))
            }
        })
    }

    useEffect(() => {
        updateChar()
    }, [comicId])

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner loading={loading} /> : null
    const { title, description, thumbnail, price, pageCount, language } = comic

    return (
        <>
            {errorMessage}
            {spinner}
            {!(loading || error) ? (
                <div className="single-comic">
                    {errorMessage}
                    {spinner}
                    <img
                        src={thumbnail}
                        alt={title}
                        className="single-comic__img"
                    />
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{title}</h2>
                        <p className="single-comic__descr">{description}</p>
                        <p className="single-comic__descr">{pageCount}</p>
                        <p className="single-comic__descr">
                            Language: {language}
                        </p>
                        <div className="single-comic__price">{price}$</div>
                    </div>
                    <Link to="/comics" className="single-comic__back">
                        Back to all
                    </Link>
                </div>
            ) : null}
        </>
    )
}

export default SingleComic
