import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPollsQuery } from "../features/polls/pollApi";
import {
  useCastVoteMutation,
  useGetUserVotesQuery,
} from "../features/votes/voteApi";

function VotePolls() {
  const navigate = useNavigate();
  const { data: polls = [], isLoading } = useGetPollsQuery();
 
  const { data: userVotesData, isLoading: userVotesLoading } =
    useGetUserVotesQuery();
  const [castVote, { isLoading: isVoting, originalArgs }] =
    useCastVoteMutation();

  const [selectedOptions, setSelectedOptions] = useState({});

  const list = userVotesData?.votedPolls || userVotesData?.votes || [];
  const votedPollIds = list.map((v) => (v?.pollId || v?._id || v).toString());

  const now = new Date();
  const activePolls = [...polls]
    .filter((p) => new Date(p.startTime) <= now && new Date(p.endTime) >= now)
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

  const handleVoteChange = (pollId, optionId, pollType) => {
    if (votedPollIds.includes(pollId)) return;

    setSelectedOptions((prev) => {
      if (pollType === "single") {
        return { ...prev, [pollId]: [optionId] };
      }
      const current = prev[pollId] || [];
      return {
        ...prev,
        [pollId]: current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
  };

  const submitVote = async (pollId) => {
    const options = selectedOptions[pollId];
    if (!options?.length) return alert("Please select at least one option");

    try {
      await castVote({ pollId, selectedOptions: options }).unwrap();
      setSelectedOptions((prev) => {
        const newObj = { ...prev };
        delete newObj[pollId];
        return newObj;
      });
    } catch (err) {
      alert(err?.data?.message || "Vote failed");
    }
  };

  if (isLoading || userVotesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 border-4 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/*Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 border-l-4 border-red-600 pl-4">
            Active Polls
          </h2>
          <button
            onClick={() => navigate("/create")}
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md active:scale-95"
          >
            <span className="text-lg md:text-xl">+</span> Create New Poll
          </button>
        </div>

        {activePolls.length === 0 ? (
          <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              No polls found. Create one to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {activePolls.map((poll) => {
              const isVoted = votedPollIds.includes(poll._id);
              const totalVotes = poll.options.reduce(
                (sum, o) => sum + (o.votes || 0),
                0,
              );

              return (
                <div
                  key={poll._id}
                  className="bg-white p-4 md:p-6 rounded-xl border border-gray-100 shadow-md"
                >
                  <h3 className="font-bold text-base md:text-xl mb-4 text-gray-900">
                    {poll.question}
                  </h3>

                  <div className="space-y-2">
                    {poll.options.map((opt) => {
                      const isSelected = selectedOptions[poll._id]?.includes(
                        opt._id,
                      );
                      const percent =
                        totalVotes > 0
                          ? Math.round(((opt.votes || 0) / totalVotes) * 100)
                          : 0;

                      return (
                        <button
                          key={opt._id}
                          disabled={isVoted || isVoting}
                          onClick={() =>
                            handleVoteChange(poll._id, opt._id, poll.pollType)
                          }
                          className={`w-full px-4 py-3 border rounded-xl flex justify-between items-center transition-all ${
                            isSelected
                              ? "border-red-500 bg-red-50 ring-1 ring-red-500"
                              : "border-gray-200"
                          } ${isVoted ? "cursor-default" : "hover:border-red-300 hover:bg-gray-50"}`}
                        >
                          <span
                            className={`font-medium ${isSelected ? "text-red-700" : "text-gray-700"}`}
                          >
                            {opt.text}
                          </span>
                          {totalVotes > 0 && (
                            <span className="text-sm font-bold text-red-600">
                              {percent}%
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isVoted ? (
                    <button
                      onClick={() => submitVote(poll._id)}
                      disabled={isVoting && originalArgs?.pollId === poll._id}
                      className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-red-200 disabled:bg-gray-400 disabled:shadow-none"
                    >
                      {isVoting && originalArgs?.pollId === poll._id
                        ? "Casting Vote..."
                        : "Submit Vote"}
                    </button>
                  ) : (
                    <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-medium bg-green-50 py-2 rounded-lg border border-green-100">
                      <span>✓ You have voted on this poll</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default VotePolls;
