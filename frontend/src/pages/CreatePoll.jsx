import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePollMutation } from "../features/polls/pollApi";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("single");
  const [expiration, setExpiration] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [createdPoll, setCreatedPoll] = useState(null);

  const navigate = useNavigate();
  const [createPoll, { isLoading }] = useCreatePollMutation();

  const addOption = () => setOptions((prev) => [...prev, ""]);

  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateOption = (value, index) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleCreatePoll = async () => {
    try {
      const filteredOptions = options.filter((opt) => opt.trim() !== "");
      if (!question.trim() || filteredOptions.length < 2) {
        alert("Question and at least 2 options required");
        return;
      }
      const start = new Date();
      let end;
      if (expiration) {
        const localDate = new Date(expiration);
        end = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
      } else {
        end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      }
      const res = await createPoll({
        question,
        type,
        options: filteredOptions.map((opt) => ({ text: opt, votes: 0 })),
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      }).unwrap();
      setCreatedPoll(res);
      setTimeout(() => navigate("/vote-polls"), 1500);
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  const isDisabled = isLoading || !question || options.filter((o) => o.trim()).length < 2;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-7">
      <div className="w-full max-w-2xl">

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-10">

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create a poll</h2>
            <p className="text-sm text-gray-500 mt-1">Ask your audience anything</p>
          </div>

          <div className="space-y-5">

            {/* Question */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1.5">
                Poll question
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" strokeLinecap="round" /><circle cx="12" cy="17" r="0.5" fill="currentColor" />
                </svg>
                <textarea
                  rows={2}
                  placeholder="What would you like to ask?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
                />
              </div>
            </div>

            {/* Type + Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Selection type
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition appearance-none cursor-pointer"
                  >
                    <option value="single">Single choice</option>
                    <option value="multiple">Multiple choice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-1.5">
                  Closing date
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
                  </svg>
                  <input
                    type="datetime-local"
                    value={expiration}
                    onChange={(e) => { setExpiration(e.target.value); e.target.blur(); }}
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                  />
                </div>
              </div>
            </div>

            {/* Options */}
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Answer options
              </label>
              <div className="space-y-2.5">
                {options.map((opt, i) => (
                  <div key={i} className="relative flex items-center gap-2">
                    <span className="absolute left-3 w-5 h-5 flex items-center justify-center bg-red-100 text-red-600 text-xs font-bold rounded-md">
                      {i + 1}
                    </span>
                    <input
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(e.target.value, i)}
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => removeOption(i)}
                        className="absolute right-3 text-gray-300 hover:text-red-400 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={addOption}
                className="mt-3 flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-red-100 rounded-md">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
                Add another option
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleCreatePoll}
              disabled={isDisabled}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating poll...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Launch poll
                </span>
              )}
            </button>
          </div>

          {/* Success */}
          {createdPoll && (
            <div className="mt-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
              <svg className="w-5 h-5 shrink-0 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3 3L22 4" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
              <span><span className="font-semibold">Poll created!</span> Redirecting to voting page...</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}