import * as React from "react";

import "./index.css";
import ReactDOM from "react-dom/client";
export const Index: React.FC = () => {
  return <div> 全局消息提示</div>;
};

declare global {
  interface Window {
    showMessage: (message: string) => void;
  }
}
type Item = {
  root: ReactDOM.Root;
  div: HTMLDivElement;
};

const res: Item[] = [];

window.showMessage = (message: string) => {
  console.log("message", message);
  const div = document.createElement("div");
  div.style.top = `${res.length * 40}px`;
  div.className = "message";
  document.body.appendChild(div);
  const root = ReactDOM.createRoot(div);
  root.render(<Index />);

  res.push({
    root,
    div,
  });
  setTimeout(() => {
    const item = res.find((item) => item.div === div)!;
    item?.root.unmount();
    root.unmount();
    document.body.removeChild(div);
    res.splice(res.indexOf(item), 1);
  }, 2000);
  console.log(div);
};
