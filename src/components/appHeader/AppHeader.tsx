import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './AppHeader.scss'

function AppHeader() {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="https://github.com">
                    <Link to="/">
                        <span>Marvel</span> information portal
                    </Link>
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            exact
                            activeStyle={{ color: '#9f0013' }}
                            to="/"
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            exact
                            activeStyle={{ color: '#9f0013' }}
                            to="/comics"
                        >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader
