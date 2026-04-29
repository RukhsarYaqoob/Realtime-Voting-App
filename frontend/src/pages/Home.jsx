import React from 'react';
import Hero from '../components/Hero';
import HomePollFeed from '../components/HomePollFeed';
import { PlusCircle, Link2, BarChart3, Clock, Users, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div>
      <Hero />
      
     <div className="space-y-20 pt-16 bg-white">
      
      {/* SECTION: HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Create a Poll in Seconds
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Easy to use, real-time results, and no sign-up required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
              <PlusCircle size={32} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">1. Draft</h3>
            <p className="text-gray-600">
              Add your question and options. Set an expiry date for your poll.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
              <Link2 size={32} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">2. Copy Link</h3>
            <p className="text-gray-600">
              Once created, just copy the unique URL and send it to your audience.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100">
              <BarChart3 size={32} />
            </div>
            <h3 className="font-bold text-xl mb-3 text-gray-800">3. Track Results</h3>
            <p className="text-gray-600">
              Check back anytime to see live charts and voting statistics.
            </p>
          </div>
        </div>
      </section>
      
      <HomePollFeed/>

      
    </div>
    </div>
  );
};

export default Home;