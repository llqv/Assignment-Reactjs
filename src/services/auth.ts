import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        getuser: builder.query({
            query: () => "/users",
            providesTags: ["Auth"]
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: '/signup',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Auth'],
        }),
        signin: builder.mutation({
            query: (user) => ({
                url: '/signin',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Auth'],
        }),
    })
});

export const {
    useSignupMutation,
    useSigninMutation,
    useGetuserQuery,
} = authApi;