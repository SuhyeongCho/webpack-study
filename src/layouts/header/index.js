import _ from "lodash";

import "./style.css";

export const header = () => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["I", "am", "Header"], " ");
  element.classList.add("header");

  return element;
};
