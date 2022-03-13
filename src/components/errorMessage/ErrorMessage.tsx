import React from 'react'
import errImg from './error.gif'
import './errorMessage.scss'

function ErrorMessage() {
    // return <img src={`${process.env.PUBLIC_URL}/error.gif`} alt="error" />
    return <img src={errImg} alt="error" className="image" />
}

export default ErrorMessage
