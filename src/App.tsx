import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainPage, ComicsPage } from 'components/pages'
import AppHeader from './components/appHeader/AppHeader'

function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Switch>
                        <Route path="/" exact>
                            <MainPage />
                        </Route>
                        <Route path="/comics" exact>
                            <ComicsPage />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App
