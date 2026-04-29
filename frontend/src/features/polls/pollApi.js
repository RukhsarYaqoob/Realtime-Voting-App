import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { socket, joinPollRoom } from "../../socket";
import { BASE_URL } from "../../api/axiosConfig"; 

export const pollApi = createApi({
  reducerPath: "pollApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL, 
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Poll"],
  endpoints: (builder) => ({
    getPolls: builder.query({
      query: () => "/polls",
      providesTags: ["Poll"],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const liveResultsHandler = (updatedPoll) => {
          updateCachedData((draft) => {
            if (Array.isArray(draft)) {
              const index = draft.findIndex(
                (p) => String(p._id) === String(updatedPoll._id)
              );
              if (index !== -1) {
                draft[index] = updatedPoll;
              }
            }
          });
        };

        const pollCreatedHandler = (newPoll) => {
          joinPollRoom(newPoll._id);
          updateCachedData((draft) => {
            if (Array.isArray(draft)) {
              const exists = draft.find(
                (p) => String(p._id) === String(newPoll._id)
              );
              if (!exists) draft.unshift(newPoll);
            }
          });
        };

        socket.on("live_results", liveResultsHandler);
        socket.on("pollCreated", pollCreatedHandler);

        try {
          const { data: initialPolls } = await cacheDataLoaded;
          if (initialPolls?.length) {
            initialPolls.forEach((p) => joinPollRoom(p._id));
          }
        } catch (err) {
          console.error("Socket logic error:", err);
        }

        await cacheEntryRemoved;
        socket.off("live_results", liveResultsHandler);
        socket.off("pollCreated", pollCreatedHandler);
      },
    }),

    castVote: builder.mutation({
      query: (voteData) => ({
        url: "/votes",
        method: "POST",
        body: voteData,
      }),
    }),

    createPoll: builder.mutation({
      query: (data) => ({ url: "/polls", method: "POST", body: data }),
      invalidatesTags: ["Poll"],
    }),

    updatePoll: builder.mutation({
      query: ({ pollId, updatedData }) => ({
        url: `/polls/${pollId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Poll"],
    }),

    deletePoll: builder.mutation({
      query: (pollId) => ({ url: `/polls/${pollId}`, method: "DELETE" }),
      invalidatesTags: ["Poll"],
    }),
  }),
});

export const {
  useGetPollsQuery,
  useCastVoteMutation,
  useCreatePollMutation,
  useUpdatePollMutation,
  useDeletePollMutation,
} = pollApi;