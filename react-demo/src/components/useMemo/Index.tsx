import * as React from "react";
import { useState } from "react";
const Index: React.FC = () => {
  // useMemo 缓存计算结果,缓存的是值，可以理解为vue中的计算属性
  const [count, setCount] = useState(0);

  const handleCount = () => {
    const arr = [1, 2, 3, 4, 5];
    console.log("first");
    return arr.reduce((pre, cur) => pre + cur, 0);
  };
  const handleCount2 = React.useMemo(() => {
    const arr = [1, 2, 3, 4, 5];
    console.log("second");
    return arr.reduce((pre, cur) => pre + cur, 0);
  }, []);

  return (
    <div>
      <h1>useMemo</h1>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <hr />
      <p>当前计数: {handleCount()}</p>
      <p>当前计数: {handleCount2}</p>
    </div>
  );
};

export default Index;
