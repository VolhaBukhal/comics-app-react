import React, { useState, useEffect } from 'react'
import './charInfo.scss'
import { MyChar, IComicsItem } from 'type/types'
import useMarvelService from 'services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import Sceleon from '../skeleton/Skeleton'

type MyViewProps = {
    char: MyChar
}
function View({ char }: MyViewProps) {
    const { name, description, thumbnail, homepage, wiki, comics } = char
    const fallBack = !!(thumbnail.indexOf('image_not_available') !== -1)

    const renderComicsItems = (arr: IComicsItem[]) => {
        return arr.slice(0, 10).map((item, i) => (
            <li key={i} className="char__comics-item">
                {item.name}
            </li>
        ))
    }
    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt="abyss"
                    style={
                        fallBack
                            ? { objectFit: 'unset' }
                            : { objectFit: 'cover' }
                    }
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics && comics.items.length > 0 ? (
                    renderComicsItems(comics.items)
                ) : (
                    <h4>There is no comics of this character.</h4>
                )}
            </ul>
        </>
    )
}

type MyProps = {
    charId: number
}

function CharInfo({ charId }: MyProps) {
    const { error, loading, getOneCharacter, clearError } = useMarvelService()
    const [char, setChar] = useState<MyChar>({
        id: charId,
        name: '',
        description: '',
        thumbnail: '',
        homepage: '',
        wiki: '',
        comics: {
            available: 0,
            collectionURI: '',
            items: [],
            returned: 0,
        },
    })

    const onCharLoaded = (newchar: MyChar) => {
        setChar(newchar)
    }

    const updateChar = () => {
        if (!charId) {
            return
        }
        clearError()
        getOneCharacter(charId).then((result) => {
            if (result && result !== null) {
                onCharLoaded(result[0])
            }
        })
    }

    useEffect(() => {
        updateChar()
    }, [charId])

    const charExist = !!char.id
    const skeleton = charExist || loading || error ? null : <Sceleon />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner loading={loading} /> : null
    const content = !(loading || error || !charExist) ? (
        <View char={char} />
    ) : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default CharInfo
