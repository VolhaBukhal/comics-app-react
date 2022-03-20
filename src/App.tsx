import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { MainPage, ComicsPage, Page404 } from 'components/pages'
import AppHeader from './components/appHeader/AppHeader'

import SingleComic from './components/singleComic'

function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route
                            path="/comics/:comicId"
                            element={<SingleComic />}
                        />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
