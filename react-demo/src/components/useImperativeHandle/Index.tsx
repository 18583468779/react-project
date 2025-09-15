import * as React from "react";

const Son = React.forwardRef((props, ref: React.Ref<HTMLDivElement>) => {
  const sonRef = React.useRef(null);
  React.useImperativeHandle(ref, () => {
    return {
      getInfo() {
        console.log("子组件信息");
      },
      name: "子组件",
      age: 18,
      sex: "男",
      ref: sonRef,
    };
  });

  return <div ref={sonRef}>子组件 </div>;
});

const Index: React.FC = () => {
  const sonRef = React.useRef(null);
  React.useEffect(() => {
    console.log(sonRef.current);
  }, []);
  return (
    <div>
      父组件
      <button onClick={() => console.log(sonRef.current.getInfo())}>
        获取子组件信息
      </button>
      <hr />
      <Son ref={sonRef} />
    </div>
  );
};
export default Index;
