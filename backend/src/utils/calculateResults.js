export const calculateResults = (poll, votes) => {
  const totalVotes = votes.length;

  const optionCounts = poll.options.map(option => {
    const count = votes.filter(v =>
      v.selectedOptions.includes(option._id.toString())
    ).length;

    return {
      _id: option._id.toString(),
      text: option.text,
      count,
      percentage:
        totalVotes === 0 ? 0 : ((count / totalVotes) * 100).toFixed(2),
    };
  });

  return {
    pollId: poll._id.toString(),
    totalVotes,
    options: optionCounts,
  };
};