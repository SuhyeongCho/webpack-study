import "./style.css";

export const newsItem = (article) => {
  const { title, urlToImage, url, description } = article;
  const element = document.createElement("a");

  element.classList.add("news-item");
  element.href = url;
  element.target = "_blank";
  const news = document.createElement("div");

  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  news.appendChild(h2);

  const p = document.createElement("p");
  p.innerHTML = description;
  news.appendChild(p);

  element.appendChild(news);

  if (urlToImage) {
    const img = document.createElement("img");
    img.src = urlToImage;
    element.appendChild(img);
  }

  return element;
};
