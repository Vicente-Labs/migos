import Axios, { type AxiosRequestConfig } from 'axios'
import axios from 'axios'

const URL = process.env.VERCEL_PROJECT_PRODUCTION_URL

export const api = axios.create({
  baseURL: `http://${URL}/api` || 'http://localhost:3000/api',
})

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error - Axios promise type
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
