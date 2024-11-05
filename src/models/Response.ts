export interface ResponseFormat<T = any> {
  title: string
  details: string
  data?: T
  error?: string
}

export interface ResponseFormat<T = any> {
  title: string
  details: string
  data?: T
  error?: string
}

export const SuccessMessage = <T>(
  title: string,
  details: string,
  data?: T
): ResponseFormat<T> => {
  return {
    title,
    details,
    data,
  }
}