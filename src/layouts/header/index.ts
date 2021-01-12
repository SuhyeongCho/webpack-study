import * as _ from "lodash";

import "./style.scss";

export const header = () => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["I", "am", "Header"], " ");
  element.classList.add("header");

  return element;
};
