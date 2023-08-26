import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),

  tagTypes: ["Videos"],

  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      
    }),

    getVideo: builder.query({
      query: (videoId) => `videos/${videoId}`,
    }),

    getRelatedVideo: builder.query({
      query: ({ title, id }) => {
        const tags = title.split(" ");
        let querySting = "";
        querySting =
          tags?.map((tag) => `title_like=${tag}`).join("&") +
          `&id_ne=${id}&_limit=4`;

        return `videos/?${querySting}`;
      },
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
} = apiSlice;
