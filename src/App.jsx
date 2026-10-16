import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Navbar from "./components/Navbar";

function ProtectedLayout({ children }) {
  const isLoggedIn = sessionStorage.getItem("demoLoggedIn") === "true";

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/posts"
        element={
          <ProtectedLayout>
            <Posts />
          </ProtectedLayout>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <ProtectedLayout>
            <PostDetail />
          </ProtectedLayout>
        }
      />

      <Route path="*" element={<Navigate to="/posts" replace />} />
    </Routes>
  );
}