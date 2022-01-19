import { useState, useCallback } from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)  // boolean // true // false
    const [error, setError] = useState(null)

    const request = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            try {
                if (body) {
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }

                const res = await fetch(url, {
                    method,
                    body,
                    headers
                })

                const data = await res.json()  // asinhron

                if (!res.ok) {
                    throw new Error(data.message || 'Something went wrong')
                }

                setLoading(false)
                return data
            } catch (error) {
                setLoading(true)
                setError(error.message)
                throw error
            }
        }, []
    )

    const clearError = useCallback(() => setError(null), []) // funksiya errorni tozalaydi

    return { request, loading, error, clearError }

}
