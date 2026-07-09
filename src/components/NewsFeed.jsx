import { useEffect, useRef, useState } from "react";

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const containerRef = useRef(null);
const resumeTimer = useRef(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/news"
        );

        const data = await response.json();

        setArticles(data.articles || []);
      } catch (error) {
        console.error("News fetch error:", error);
      }
    }

    fetchNews();

    const interval = setInterval(fetchNews, 1800000); // 30 min

    return () => clearInterval(interval);
  }, []);

  const handleWheel = () => {
  const container = containerRef.current;

  if (!container) return;

  container.classList.add("manual-scroll");

  clearTimeout(resumeTimer.current);

  resumeTimer.current = setTimeout(() => {
    container.classList.remove("manual-scroll");
  }, 5000);
};
  return (
  <div
  ref={containerRef}
  className="news-feed-container"
  onWheel={handleWheel}
>

    <div className="news-feed-scroll">

      {[...articles, ...articles].map((article, index) => (
        <div
          key={index}
          className="border-b border-cyan-900 pb-3"
        >
          <div className="flex justify-between text-xs text-cyan-600 uppercase mb-1">
            <span>{article.source?.name}</span>
            <span className="live-badge">
  ● LIVE
</span>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 hover:text-cyan-100 block"
          >
            {article.title}
          </a>

          <p className="text-xs text-cyan-700 mt-1">
            {article.publishedAt
              ? new Date(article.publishedAt).toLocaleTimeString()
              : ""}
          </p>
        </div>
      ))}

    </div>

  </div>
);
}

export default NewsFeed;