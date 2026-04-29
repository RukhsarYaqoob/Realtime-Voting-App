import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePoll from "./pages/CreatePoll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Result from "./pages/Result";
import PollList from "./pages/PollList";
import VotePolls from "./pages/VotePolls";
import PrivateRoute from "./routes/PrivateRoute";
import { socket } from "./socket";
import { useEffect } from "react";


function App() {
   useEffect(() => {
  socket.connect();

  return () => {
    socket.disconnect();
  };
}, []); 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/result" element={<Result />} />

          {/* Protected Route  */}
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePoll />
              </PrivateRoute>
            }
          />

          <Route
            path="/browse"
            element={
              <PrivateRoute>
                <PollList />
              </PrivateRoute>
            }
          />

          <Route
            path="/vote-polls"
            element={
              <PrivateRoute>
                <VotePolls />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
