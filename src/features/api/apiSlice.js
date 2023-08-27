import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000/",
  }),

  tagTypes: ["Videos", "Video", "RelatedVideo"],

  endpoints: (builder) => ({
    /** Get videos endpoint */
    getVideos: builder.query({
      query: () => "videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"],
    }),
    /** Add Video Endpoint */
    addVideo: builder.mutation({
      query: (data) => ({
        url: "videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    /** Edit video endpoint */
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.id },
        { type: "RelatedVideo", id: arg.id },
      ],
    }),
    /** Get video endpoint */
    getVideo: builder.query({
      query: (videoId) => `videos/${videoId}`,
      providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
    }),
    /** Get Related video endpoint */
    getRelatedVideo: builder.query({
      query: ({ title, id }) => {
        const tags = title.split(" ");
        let querySting = "";
        querySting =
          tags?.map((tag) => `title_like=${tag}`).join("&") +
          `&id_ne=${id}&_limit=4`;

        return `videos/?${querySting}`;
      },
      providesTags: (result, error, arg) => [
        { type: "RelatedVideo", id: arg.id },
      ],
    }),
    /** Delete vedio endpoint */
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg },
        { type: "RelatedVideo", id: arg },
      ],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideoQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
