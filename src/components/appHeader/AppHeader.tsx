import React from 'react'
import './AppHeader.scss'

function AppHeader() {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="https://github.com">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <a href="https://github.com">Characters</a>
                    </li>
                    /
                    <li>
                        <a href="https://github.com">Comics</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader
