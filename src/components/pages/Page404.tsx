import React from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../errorMessage'

function Page404() {
    return (
        <div>
            <ErrorMessage />
            <p style={{ textAlign: 'center', fontSize: '2rem' }}>
                Page doesn&apos;t exist
            </p>
            <Link
                to="/"
                style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: '2rem',
                    marginTop: '3rem',
                    color: 'red',
                }}
            >
                Back to main page
            </Link>
        </div>
    )
}

export default Page404
