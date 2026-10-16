import { useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Demo login only. No authentication API is used.
    sessionStorage.setItem("demoLoggedIn", "true");
    navigate("/posts");
  }

  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="visual-content">
          <span className="visual-logo"><BookOpen size={25} /> PostSpace</span>
          <div className="visual-copy">
            <span className="eyebrow">YOUR DAILY DOSE OF DISCOVERY</span>
            <h1>Ideas worth<br />coming back to.</h1>
            <p>Explore stories, discover new perspectives, and find something interesting every day.</p>
          </div>
          <div className="visual-footer">A little inspiration goes a long way.</div>
        </div>
      </section>

      <section className="login-form-side">
        <form className="login-card" onSubmit={handleSubmit}>
          <div className="mobile-brand"><BookOpen size={23} /> PostSpace</div>

          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to your account</h2>
          <p className="muted">Enter your details to continue exploring.</p>

          <label htmlFor="email">Email address</label>
          <div className="input-wrap">
            <Mail size={18} />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <LockKeyhole size={18} />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              minLength={6}
              required
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="primary-btn login-submit" type="submit">
            Sign in <ArrowRight size={18} />
          </button>

          <p className="demo-note">
            Demo application · Use any valid email and a password of 6+ characters.
          </p>
        </form>
      </section>
    </main>
  );
}