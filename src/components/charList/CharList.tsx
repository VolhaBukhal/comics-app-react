import React from 'react'
import './charList.scss'
import abyss from 'assets/img/abyss.jpg'

function CharList() {
    return (
        <div className="char__list">
            <ul className="char__grid">
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss" />
                    <div className="char__name">Abyss</div>
                </li>
            </ul>
            <button type="button" className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList
