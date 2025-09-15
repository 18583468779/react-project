import * as React from "react";
const Index2: React.FC = () => {
  React.useLayoutEffect(() => {
    const root1 = document.querySelector("#root1")! as HTMLDivElement;
    root1.style.width = "100px";
    root1.style.height = "100px";
    root1.style.backgroundColor = "red";
    root1.style.top = "100px";
    root1.style.opacity = "1";
  }, []);

  return (
    <div>
      Index2
      <div
        id="root1"
        style={{
          width: "200px",
          height: "200px",
          transition: "all 3s ease",
          position: "relative",
          opacity: "0",
        }}
      >
        root1
      </div>
    </div>
  );
};

export default Index2;
