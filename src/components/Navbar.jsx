import { BookOpen, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem("demoLoggedIn");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => navigate("/posts")}>
          <span className="brand-icon">
            <BookOpen size={21} />
          </span>
          PostSpace
        </button>

        <div className="nav-right">
          <span className="user-chip">
            <UserRound size={16} />
            Demo User
          </span>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}