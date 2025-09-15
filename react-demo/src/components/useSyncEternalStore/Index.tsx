import * as React from "react";
import { useStorage } from "../../hooks/useStorage";
const Index: React.FC = () => {
  /**
   *  useSyncExternalStore 同步外部状态(例如状态管理库、浏览器api等)获取状态并在组件中同步显示。
   */

  const [count, setCount] = useStorage("count", 0);
  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
      <button onClick={() => setCount(0)}>重置</button>
    </div>
  );
};

export default Index;
