import axios from "axios";
import * as _ from "lodash";
import { newsItem, Article } from "../newsItem";

import "./style.scss";

export const newsList = async () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("news-list__wrapper");
  const element = document.createElement("div");
  element.classList.add("news-list");

  const { data } = await axios.get(buildUrl());

  const h1 = document.createElement("h1");
  h1.innerHTML = _.join(["뉴스", "리스트"], " ");
  element.appendChild(h1);

  const ul = document.createElement("ul");
  (data?.articles ?? []).map((article: Article) => {
    const li = document.createElement("li");
    li.appendChild(newsItem(article));
    ul.appendChild(li);
  });
  element.appendChild(ul);

  wrapper.appendChild(element);

  return wrapper;
};

const buildUrl = (params?: {
  country?: string;
  category?: string;
  pageSize?: number;
}) => {
  const { country = "kr", category = "general", pageSize = 10 } = params ?? {};
  const apiKey = "acc33556bc7343e1a5bed9eb2542b4f4";
  return `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;
};
