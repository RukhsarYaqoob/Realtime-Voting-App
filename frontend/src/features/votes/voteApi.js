import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../api/axiosConfig";
import { socket } from "../../socket";

export const voteApi = createApi({
  reducerPath: "voteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Vote"],
  endpoints: (builder) => ({

    getUserVotes: builder.query({
      query: () => "/votes/user-all",
      providesTags: ["Vote"],
      async onCacheEntryAdded(
        arg,
        { dispatch, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const refetchHandler = () => {
            dispatch(voteApi.util.invalidateTags(["Vote"]));
          };
        try {
          await cacheDataLoaded;

          socket.on("vote_cast", refetchHandler);

        } catch (err) {
          console.error(err);
        }

        await cacheEntryRemoved;
        socket.off("vote_cast", refetchHandler);
      },
    }),

    castVote: builder.mutation({
      query: (data) => ({
        url: "/votes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vote"],
    }),
  }),
});

export const {
  useCastVoteMutation,
  useGetUserVotesQuery,
} = voteApi;