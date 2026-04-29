import { useState } from "react";
import {
  useGetPollsQuery,
  useDeletePollMutation,
  useUpdatePollMutation,
} from "../features/polls/pollApi";

import { Calendar, Layers, Trash2, Edit3, X, Save } from "lucide-react";

function PollList() {
  const { data: polls = [], isLoading } = useGetPollsQuery();
  const [deletePoll, { isLoading: deleting }] = useDeletePollMutation();
  const [updatePoll, { isLoading: updating }] = useUpdatePollMutation();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPoll, setEditPoll] = useState(null);

  const handleEdit = (poll) => {
    setEditPoll(JSON.parse(JSON.stringify(poll)));
    setIsEditOpen(true);
  };

  const handleOptionChange = (value, index) => {
    const updated = [...editPoll.options];
    updated[index].text = value;
    setEditPoll({ ...editPoll, options: updated });
  };

  const saveEditedPoll = async () => {
    try {
      await updatePoll({
        pollId: editPoll._id,
        updatedData: {
          question: editPoll.question,
          pollType: editPoll.pollType,
          endTime: editPoll.endTime,
          options: editPoll.options.map((opt) => ({
            text: opt.text,
            votes: opt.votes || 0,
          })),
        },
      }).unwrap();
      setIsEditOpen(false);
      setEditPoll(null);
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await deletePoll(id).unwrap();
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-14 w-14 border-4 border-red-100 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
          Your Polls
        </h2>
        <span
          className="
    bg-red-50 text-red-600 font-medium px-3 py-1.5 lg:px-4 lg:py-1.5 text-sm lg:text-base rounded-full border border-red-100 whitespace-nowrap
  "
        >
          {polls.length} Total
        </span>
      </div>

      {polls.length === 0 ? (
        <p className="text-center text-slate-400 py-20 bg-slate-50 rounded-2xl border-2 border-dashed">
          No polls found. Create one to get started!
        </p>
      ) : (
        <div className="grid gap-4 md:gap-6">
          {polls.map((poll) => (
            <div
              key={poll._id}
              className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-3 mb-2">
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${poll.pollStatus === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                >
                  {poll.pollStatus}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <Layers size={14} /> {poll.pollType}
                </span>
              </div>

              <h3 className="text-base md:text-xl font-bold mb-3 text-slate-800">
                {poll.question}
              </h3>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                <Calendar size={16} />
                <span>Ends: {formatDate(poll.endTime)}</span>
              </div>

              <div className="grid gap-2">
                {poll.options.map((opt) => (
                  <div
                    key={opt._id}
                    className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-slate-700 text-sm"
                  >
                    {opt.text}
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleEdit(poll)}
                  className="flex-1 flex items-center justify-center gap-2 border border-slate-200 p-2.5 rounded-xl hover:bg-slate-50 transition-colors font-medium text-slate-700"
                >
                  <Edit3 size={16} /> Edit
                </button>

                <button
                  onClick={() => handleDelete(poll._id)}
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 p-2.5 rounded-xl transition-all font-medium"
                >
                  <Trash2 size={16} /> {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && editPoll && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="font-bold text-xl text-slate-800">
                Edit Poll Settings
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-400 hover:text-red-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Question
                </label>
                <input
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none mt-1"
                  value={editPoll.question}
                  onChange={(e) =>
                    setEditPoll({ ...editPoll, question: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Poll Type
                </label>
                <select
                  className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none mt-1"
                  value={editPoll.pollType}
                  onChange={(e) =>
                    setEditPoll({ ...editPoll, pollType: e.target.value })
                  }
                >
                  <option>Single Choice</option>
                  <option>Multiple Choice</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Options
                </label>
                <div className="space-y-2 mt-1">
                  {editPoll.options.map((opt, i) => (
                    <input
                      key={opt._id}
                      className="w-full border border-slate-200 p-2.5 rounded-lg focus:border-red-500 outline-none transition-colors"
                      value={opt.text}
                      onChange={(e) => handleOptionChange(e.target.value, i)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 bg-slate-50 border-t">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-6 py-2.5 font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedPoll}
                disabled={updating}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-red-200 transition-all active:scale-95 disabled:opacity-50"
              >
                <Save size={18} />
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PollList;
