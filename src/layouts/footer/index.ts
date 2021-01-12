import * as _ from "lodash";

import "./style.scss";

export const footer = () => {
  const element = document.createElement("div");
  element.innerHTML = _.join(["I", "am", "Footer"], " ");
  element.classList.add("footer");

  return element;
};
