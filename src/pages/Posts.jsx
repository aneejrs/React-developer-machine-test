import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Search, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPosts(signal) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, { signal });
      if (!response.ok) throw new Error("Unable to load posts.");

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError("We couldn't load the posts. Please check your connection and try again.");
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal);
    return () => controller.abort();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return posts;

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query) ||
        String(post.id).includes(query)
    );
  }, [posts, search]);

  return (
    <main className="page-container">
      <section className="hero">
        <div>
          <span className="eyebrow">THE POSTSPACE COLLECTION</span>
          <h1>Ideas, stories &amp; <span>perspectives.</span></h1>
          <p>Explore the collection. There might be something you didn't know you needed to read.</p>
        </div>
        <div className="hero-icon"><BookOpen size={35} /></div>
      </section>

      <section className="list-toolbar">
        <div>
          <h2>Explore posts</h2>
          <p className="muted">
            {loading ? "Loading the collection…" : `${filteredPosts.length} posts found`}
          </p>
        </div>

        <div className="search-box">
          <Search size={18} />
          <input
            aria-label="Search posts"
            placeholder="Search by title, content or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {loading && (
        <div className="status-panel">
          <div className="spinner" />
          <p>Gathering stories for you...</p>
        </div>
      )}

      {!loading && error && (
        <div className="status-panel">
          <p className="error-text">{error}</p>
          <button className="secondary-btn" onClick={() => fetchPosts()}>
            <RefreshCw size={16} /> Try again
          </button>
        </div>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <div className="status-panel">
          <Search size={28} />
          <h3>No posts found</h3>
          <p>Try another search term.</p>
          <button className="secondary-btn" onClick={() => setSearch("")}>
            Clear search
          </button>
        </div>
      )}

      {!loading && !error && filteredPosts.length > 0 && (
        <section className="posts-grid">
          {filteredPosts.map((post, index) => (
            <article className="post-card" key={post.id}>
              <div className="card-topline">
                <span className="post-number">POST / {String(post.id).padStart(3, "0")}</span>
                <span className="card-arrow"><ArrowUpRight size={19} /></span>
              </div>

              <div className={`post-art art-${index % 4}`}>
                <span>{String(post.id).padStart(2, "0")}</span>
                <BookOpen size={29} strokeWidth={1.5} />
              </div>

              <div className="post-card-content">
                <span className="category-tag">DISCOVERY · #{post.userId}</span>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <Link className="read-link" to={`/posts/${post.id}`}>
                  Read story <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      )}

      <footer className="page-footer">PostSpace · Made for curious minds.</footer>
    </main>
  );
}