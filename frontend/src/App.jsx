import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddNote from "./pages/AddNote";
import Dashboard from "./pages/Dashboard";
import EditNote from "./pages/Edit";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Navbar />

      <main className="w-full min-h-[calc(100vh-64px)]">
        <Routes>
          {/* Always accessible */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/addnote"
            element={isLoggedIn ? <AddNote /> : <Navigate to="/login" />}
          />
          <Route
            path="/edit/:id"
            element={isLoggedIn ? <EditNote /> : <Navigate to="/login" />}
          />

          {/* Unknown routes redirect to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
