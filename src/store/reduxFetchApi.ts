import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootObject } from './interface/fetchApi'

const API_KEY = 'cbfb51a2-84b6-4025-a3e2-ed8616edf311'

export const apiSlice = createApi({
   reducerPath: 'api',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://query2.finance.yahoo.com/v8/finance/chart/%5EGSPC',
      prepareHeaders(headers) {
         headers.set('x-api-key', API_KEY)

         return headers
      }
   }),
   endpoints(builder) {
      return {}
   }
})

export const {} = apiSlice
