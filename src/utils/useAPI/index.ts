import config from '@/config'

const baseURL = config.BASE_API
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
}

async function useAPI<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  try {
    const response = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

export default useAPI
