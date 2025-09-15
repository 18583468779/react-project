import * as React from "react";
const Index3: React.FC = () => {
  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    window.history.replaceState(null, "", `?top=${scrollTop}`);
  };

  React.useLayoutEffect(() => {
    const top = window.location.search.split("=")[1];

    if (top) {
      const container = document.querySelector("#container")! as HTMLDivElement;
      container?.scrollTo(0, Number(top));
    }
  }, []);

  return (
    <div
      onScroll={scrollHandler}
      id="container"
      style={{ height: "400px", overflowY: "auto" }}
    >
      {Array(1000)
        .fill(0)
        .map((item, index) => {
          return <div key={index}>{index}</div>;
        })}
    </div>
  );
};

export default Index3;
