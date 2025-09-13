import React from "react";
import { createRoot } from "react-dom/client";

const App = () => {
  console.log("first");
  return <div>Hello World</div>;
};
const container = document.getElementById("root");
createRoot(container).render(<App />);
