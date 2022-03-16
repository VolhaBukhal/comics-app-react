import React, { Component } from 'react'
import ErrorMessage from '../errorMessage'

type MyState = {
    error: boolean
}

type MyProps = {
    children: React.ReactNode
}
class ErrorBoundary extends Component<MyProps, MyState> {
    static componentDerivedStateFromError(error: Error) {
        return { error: true }
    }

    constructor(props: MyProps) {
        super(props)
        this.state = {
            error: false,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('Unchaught error: ', error, errorInfo)

        this.setState({ error: true })
    }

    render() {
        const { error } = this.state
        const { children } = this.props
        if (error) {
            // return <h1>Sorry.. there was an error</h1>
            return <h1>Sorry.. there was an error</h1>
        }

        return children
    }
}

export default ErrorBoundary
