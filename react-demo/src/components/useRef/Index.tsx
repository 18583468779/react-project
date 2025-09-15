import * as React from "react";
const Index: React.FC = () => {
  // 当你在react中需要处理Dom元素时或者需要再组件渲染之间保持持久行数据时
  const ref = React.useRef<HTMLDivElement>(null);
  const [count, setCount] = React.useState(0);
  let num = 0; // 组件每次渲染都会初始化,所以它的值永远是0
  const countNum = React.useRef(0); // 组件每次渲染不会初始化,所以它的值会保持不变
  React.useEffect(() => {
    console.log(ref.current);
  }, []);
  const handleClick = () => {
    if (ref.current) {
      ref.current.innerHTML = "hello world";
    }
  };

  const handleCount = () => {
    setCount(count + 1);
    num = count;
    countNum.current = count;
  };
  return (
    <div>
      Index
      <div ref={ref}>世界和平</div>
      <button onClick={handleClick}>点击</button>
      <hr />
      数据存储
      <div>
        <div>
          当前计数: {count},当前num: {num},当前countNum: {countNum.current}
        </div>
        <button onClick={handleCount}>增加计数</button>
      </div>
    </div>
  );
};

export default Index;
