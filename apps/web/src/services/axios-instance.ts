import Axios, { AxiosRequestConfig } from 'axios'

import { env } from '../env.mjs'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
})

export const axiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error cancel method is not typed
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
