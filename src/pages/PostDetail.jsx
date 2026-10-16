import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, RefreshCw } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPost() {
      try {
        setLoading(true);
        setError("");
        setPost(null);

        if (!/^\d+$/.test(id) || Number(id) < 1 || Number(id) > 100) {
          throw new Error("This post could not be found.");
        }

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Unable to load this post.");

        const data = await response.json();

        if (!data.id) throw new Error("This post could not be found.");

        setPost(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchPost();
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="page-container">
        <div className="status-panel">
          <div className="spinner" />
          <p>Opening your story...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <button className="back-link" onClick={() => navigate("/posts")}>
          <ArrowLeft size={17} /> Back to posts
        </button>
        <div className="status-panel">
          <h2>Post unavailable</h2>
          <p>{error}</p>
          <button className="secondary-btn" onClick={() => navigate(0)}>
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container detail-page">
      <Link to="/posts" className="back-link">
        <ArrowLeft size={17} /> Back to all posts
      </Link>

      <article className="detail-article">
        <div className={`detail-cover art-${post.id % 4}`}>
          <span className="cover-label">THE POSTSPACE JOURNAL</span>
          <BookOpen size={60} strokeWidth={1.1} />
          <span className="cover-number">
            {String(post.id).padStart(3, "0")}
          </span>
        </div>

        <div className="article-body">
          <div className="article-meta">
            <span className="category-tag">DISCOVERY</span>
            <span>Post #{post.id}</span>
            <span>Author ID: {post.userId}</span>
          </div>

          <h1>{post.title}</h1>

          <div className="article-divider" />

          <p className="article-intro">{post.body}</p>

          <div className="article-callout">
            <span className="callout-icon"><BookOpen size={22} /></span>
            <div>
              <h3>A moment to explore</h3>
              <p>
                Every post offers another perspective. Keep exploring the
                collection and discover more ideas.
              </p>
            </div>
          </div>

          <div className="article-bottom">
            <span>END OF STORY · #{post.id}</span>
            <button
              className="primary-btn"
              onClick={() => navigate(`/posts/${post.id === 100 ? 1 : Number(post.id) + 1}`)}
            >
              Next post <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </article>

      <footer className="page-footer">PostSpace · Made for curious minds.</footer>
    </main>
  );
}