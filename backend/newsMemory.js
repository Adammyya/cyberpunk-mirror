let articles = [];

export function saveNews(news) {
  articles = news;
}

export function getNews() {
  return articles;
}
console.log("NEWS MEMORY LOADED");
console.log("WEATHER TOOL LOADED");
console.log("SYSTEM TOOL LOADED");