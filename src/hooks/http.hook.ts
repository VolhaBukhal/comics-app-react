import React, { useState, useCallback } from 'react'
import { ICharactor } from 'type/types'

export const useHttp = () => {
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<ICharactor>()

    const request = useCallback(
        async (
            url: string,
            method = 'GET',
            body = null,
            headers: { 'Content-Type': string } = {
                'Content-Type': 'application/json',
            }
        ) => {
            setLoading(true)
            try {
                const response = await fetch(url, { method, body, headers })

                if (!response.ok) {
                    throw new Error(
                        `could not fetch ${url}, status: ${response.status}`
                    )
                }
                const result: ICharactor = await response.json()
                setLoading(false)
                setData(result)
                return result
            } catch (err) {
                setLoading(false)
                setError(true)
                console.log(err)
            }
            return data
        },
        []
    )

    const clearError = useCallback(() => setError(false), [])

    return {
        data,
        loading,
        request,
        error,
        clearError,
    }
}
