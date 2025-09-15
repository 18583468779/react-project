import * as React from "react";
const Index: React.FC = () => {
  // 使用Ref实现一个简单的定时器
  const [time, setTime] = React.useState(0);
  const timer = React.useRef<any>(null);

  const start = () => {
    timer.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };
  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
  };
  return (
    <div>
      <h1>计时器</h1>
      <div>
        <span>{time}</span>
      </div>
      <button onClick={start}>开始</button>
      <button onClick={stop}>结束</button>
    </div>
  );
};

export default Index;
