import { useGetPollsQuery } from "../features/polls/pollApi";
import { Users, TrendingUp, ChevronRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function HomeFeed() {
  const { data: polls = []} = useGetPollsQuery();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Editorial Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600">
            <Zap size={18} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-[0.3em]">Live Stream</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Active <span className="text-red-600">Polls</span>
          </h2>
        </div>
        <p className="text-slate-400 text-sm font-medium border-l-2 border-slate-200 pl-4">
          Latest community insights <br /> updated just now.
        </p>
      </header>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => {
            const totalVotes = poll.options?.reduce((sum, o) => sum + (o.votes || 0), 0) || 0;

            return (
              <motion.div
                layout
                key={poll._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Link to={`/vote-polls`} className="group block">
                  <div className="h-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-red-200 transition-all duration-300 relative overflow-hidden">
                    
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                    <div className="flex justify-between items-start mb-6">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                        <TrendingUp size={12} /> Live
                      </span>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Users size={14} />
                        <span className="text-xs font-bold">{totalVotes}</span>
                      </div>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-8 group-hover:text-red-600 transition-colors">
                      {poll.question}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                        {new Date(poll.createdAt).toLocaleDateString()}
                      </span>
                      <div
                      className="flex items-center gap-1 text-red-600 font-bold text-xs uppercase tracking-tighter group-hover:gap-2 transition-all">
                        Cast Vote <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {polls.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Waiting for new polls...</p>
        </div>
      )}
    </div>
  );
}

export default HomeFeed;