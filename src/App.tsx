import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AppHeader from './components/appHeader/AppHeader'
import Spinner from './components/spinner'
import SingleComic from './components/singleComic'

// 812kB js folder

const Page404 = lazy(() => import('components/pages/Page404'))
const MainPage = lazy(() => import('components/pages/MainPage'))
const ComicsPage = lazy(() => import('components/pages/ComicsPage'))

function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner loading />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route
                                path="/comics/:comicId"
                                element={<SingleComic />}
                            />
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    )
}

export default App
