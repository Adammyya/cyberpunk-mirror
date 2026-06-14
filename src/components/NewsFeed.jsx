import { useEffect, useState } from "react";

function NewsFeed() {
  const [articles, setArticles] = useState([]);

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

  return (
    <div className="space-y-3 h-full overflow-y-auto pr-2">
      {articles.slice(0, 8).map((article, index) => (
        <div
          key={index}
          className="border-b border-cyan-900 pb-3"
        >
          <div className="flex justify-between text-xs text-cyan-600 uppercase mb-1">
            <span>{article.source?.name}</span>
            <span>LIVE</span>
          </div>

          <a
            href={article.url}
            target="_blank"
            rel="noreferrer"
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
  );
}

export default NewsFeed;