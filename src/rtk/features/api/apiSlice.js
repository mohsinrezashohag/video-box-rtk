import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({

    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),

    tagTypes: ["videos", "video", "relatedVideo"],

    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos',
            // keepUnusedDataFor: 5,
            providesTags: ["videos"]
        }),
        getVideo: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: (result, error, arg) => ["video", { type: "video", id: arg }]

        }),
        getRelatedVideos: builder.query({
            query: ({ id, title }) => {
                const tags = title.split(' ').map(tag => `title_like=${tag}`).join('&')
                const queryString = `/videos?${tags}&_limit=4`
                return queryString
            },
            providesTags: (result, error, arg) => ["relatedVideo", { type: "relatedVideo", id: arg.id }]
        }),
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["videos"]
        }),
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: `/videos/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, arg) => [
                "videos",
                { type: "video", id: arg.id },
                { type: "relatedVideo", id: arg.id }
            ]
        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: `/videos/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["videos"]
        }),
    })
})

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation, useDeleteVideoMutation } = apiSlice