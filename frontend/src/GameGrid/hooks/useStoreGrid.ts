import { useState } from 'react'
import grid from '../Grid'

export const useStoreGrid = () => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const postData = async (url: string, data: any) => {
    setIsLoading(true)
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ grid: data }),
    })
      .then(async res => {
        const result = await res.json()
        setResponse(result)
        setIsLoading(false)
      })
      .catch(err => {
        setError(err)
        setIsLoading(false)
      })
  }

  return { postData, response, error, isLoading }
}
