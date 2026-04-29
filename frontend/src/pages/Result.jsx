import { useGetPollsQuery } from "../features/polls/pollApi";
import { Users, Activity, CheckCircle2, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Results() {
  const { data: polls = [], isLoading } = useGetPollsQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfdfd]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        >
          <Activity className="text-red-600 h-10 w-10" />
        </motion.div>
        <p className="mt-4 text-slate-400 font-medium text-xs tracking-[0.2em] uppercase">Syncing Live Data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-8 md:py-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Modern Header */}
        <header className="mb-6 md:mb-12 space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-red-600 rounded-full" />
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">Analytics</h2>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[1.1rem]">
            Real-time sentiment tracking <span className="mx-2 text-slate-300">|</span> {polls.length} Active Polls
          </p>
        </header>

        <AnimatePresence mode="popLayout">
          {polls.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-16 rounded-2xl border border-slate-200 text-center shadow-sm"
            >
              <p className="text-slate-400 font-medium">No active polls found at the moment.</p>
            </motion.div>
          ) : (
            <div className="grid gap-5 md:gap-8">
              {polls.map((poll) => {
                const totalVotes = poll.options?.reduce((sum, o) => sum + (o.votes || 0), 0) || 0;
                const winner = poll.options?.reduce((a, b) => (a.votes || 0) > (b.votes || 0) ? a : b);

                return (
                  <motion.div 
                    layout
                    key={poll._id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/50"
                  >
                    {/* Poll Card Header */}
                    <div className="p-4 md:p-6 border-b border-slate-50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <TrendingUp size={12} /> Live Now
                        </span>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-slate-600">
                          <Users size={14} />
                          <span className="text-xs font-bold">{totalVotes.toLocaleString()}</span>
                        </div>
                      </div>
                      <h3 className="text-base md:text-xl font-bold text-slate-800 leading-snug">
                        {poll.question}
                      </h3>
                    </div>

                    {/* Interactive Options Area */}
                    <div className="px-4 md:px-6 bg-gradient-to-b from-white to-slate-50/50 space-y-4">
                      {poll.options?.map((opt) => {
                        const votes = opt.votes || 0;
                        const percent = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                        const isWinner = winner?._id === opt._id && totalVotes > 0;

                        return (
                          <div key={opt._id} className="group">
                            <div className="flex justify-between items-end mb-3">
                              <div className="flex items-center gap-3">
                                {isWinner ? (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <CheckCircle2 size={20} className="text-green-500" />
                                  </motion.div>
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-200" />
                                )}
                                <span className={`font-semibold transition-colors ${isWinner ? 'text-slate-900' : 'text-slate-500'}`}>
                                  {opt.text}
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-base font-bold text-slate-900 tracking-tighter">{percent}%</span>
                                <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">{votes} Votes</p>
                              </div>
                            </div>
                            
                            {/* Animated Progress Bar */}
                            <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className={`h-full rounded-full relative ${
                                  isWinner 
                                  ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)]' 
                                  : 'bg-slate-300'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Micro-Footer */}
                    <div className="px-8 py-3 bg-white border-t border-slate-100 flex justify-between items-center opacity-60">
                      <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                        Ref: {poll._id.slice(-8)}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase">Secure Link</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Results;