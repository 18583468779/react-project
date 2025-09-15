import * as React from "react";
const Index: React.FC = () => {
  // 1. useLayoutEffect 是用于在浏览器重新绘制屏幕之前触发
  /**
   * 2. useLayoutEffect 和 useEffect的区别
   *    - 执行时机：浏览器完成布局和绘制之前执行副作用 ------ 浏览器完成布局和绘制之后执行副作用函数
   *    - 执行方式： 同步执行 ----- 异步执行
   *    - Dom渲染： 阻塞Dom渲染 ----- 不阻塞Dom渲染
   */
  /**
   * 3. 应用场景:
   * -需要同步读取或更改Dom：例如你需要读取元素大小或位置并在渲染前进行调整
   * -防止闪烁：在某些情况下，异步的useEffect可以会导致可见的布局跳动或闪烁。例如，动画的启动或某些可见的快速dom更改
   */

  const [count, setCount] = React.useState(0);

  // React.useEffect(() => {
  //   for (let i = 0; i < 3000; i++) {
  //     setCount((count) => count + 1);
  //   }
  // }, []);

  React.useLayoutEffect(() => {
    console.log("useLayoutEffect");
    for (let i = 0; i < 30000; i++) {
      setCount((count) => count + 1);
    }
  }, []);

  return (
    <div>
      Index
      {Array.from({ length: count }).map((_, index) => {
        return <div key={index}>{index}</div>;
      })}
    </div>
  );
};

export default Index;
