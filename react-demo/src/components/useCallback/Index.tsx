import * as React from "react";
const Index: React.FC = () => {
  /**
   * memo 子组件只有当props发生变化时才会重新渲染
   * useCallback 子组件只有当依赖的props发生变化时才会重新渲染
   */
  const [count, setCount] = React.useState(0);

  const handleChildClick = React.useCallback(() => {
    console.log("子组件点击");
  }, []);

  return (
    <div>
      父组件
      <button onClick={() => setCount(count + 1)}>count: {count}</button>
      <hr />
      <Child onClick={handleChildClick} />
    </div>
  );
};

const Child = React.memo((props: any) => {
  console.log("子组件渲染");
  const { onClick } = props;
  return <div onClick={onClick}>Child</div>;
});

export default Index;
