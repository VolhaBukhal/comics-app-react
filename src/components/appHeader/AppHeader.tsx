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
                            end
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
                            to="/"
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={({ isActive }) => ({
                                color: isActive ? '#9f0013' : 'inherit',
                            })}
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
