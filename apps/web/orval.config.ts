import { defineConfig } from 'orval'

export default defineConfig({
  'migos-api': {
    input: {
      target: 'http://localhost:3333/docs/json',
    },
    output: {
      mode: 'tags',
      target: 'src/http/endpoints.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/services/axios-instance.ts',
          name: 'axiosInstance',
        },
        query: {
          useQuery: true,
          useInfinite: false,
          useSuspenseQuery: true,
          useSuspenseInfiniteQuery: false,
        },
      },
    },
  },
})
