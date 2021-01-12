import { header, footer } from "./layouts";
import { newsList } from "./news";

const app = async () => {
  const element = document.createElement("div");

  element.appendChild(header());
  element.appendChild(await newsList());
  element.appendChild(footer());

  return element;
};

app().then((comp) => document.body.appendChild(comp));
