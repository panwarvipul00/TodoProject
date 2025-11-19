import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todos from "./pages/Todos";
import { useAuthStore } from "./store";

export default function App() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <header className="bg-white shadow-md">
        <nav className="max-w-5xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Todo App
          </h1>

          <div className="flex items-center gap-6">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="text-gray-700 font-medium hover:text-purple-600 transition"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/todos"
                  className="text-gray-700 font-medium hover:text-blue-600 transition"
                >
                  Todos
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
}
