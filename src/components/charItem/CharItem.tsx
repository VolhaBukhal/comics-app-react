import React, { FC } from 'react'
import { MyChar } from 'type/types'

type MyProps = {
    char: MyChar
}
function CharItem({ char }: MyProps) {
    return (
        <li className="char__item">
            <img src={`${char.thumbnail}`} alt={char.name} />
            <div className="char__name">{char.name}</div>
        </li>
    )
}

export default CharItem
