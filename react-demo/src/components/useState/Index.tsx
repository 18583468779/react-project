import * as React from "react";
const Index: React.FC = () => {
  // useState的更新机制：异步
  const [index, setIndex] = React.useState(0);

  console.log("render");
  const handleClick = () => {
    setIndex(index + 1);
    setIndex(index + 1);
    setIndex(index + 1);

    console.log(index); // 0 只渲染一次
  };

  const handleClick2 = () => {
    setIndex((prev) => prev + 1);
    setIndex((prev) => prev + 1);
    setIndex((prev) => prev + 1);

    console.log(index);
  };
  return (
    <div>
      <div>
        <h1>{index}</h1>
        <button onClick={handleClick}>异步更改值</button>
        <button onClick={handleClick2}>同步步更改值</button>
      </div>
    </div>
  );
};

export default Index;
