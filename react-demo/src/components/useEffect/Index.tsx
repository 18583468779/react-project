import * as React from "react";
import { useEffect } from "react";

function Child(props: { name: string }) {
  // useEffect(() => {
  //   console.log("子元素挂载");

  //   return () => {
  //     console.log("子元素清除");
  //   };
  // }, [props.name]);

  useEffect(() => {
    // 6. 防止请求多次发送，做一个防抖
    const timer = setTimeout(() => {
      fetch("http://localhost:5173?name=" + props.name);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [props.name]);
  return <div>子元素{props.name}</div>;
}

const Index: React.FC = () => {
  const [name, setName] = React.useState("xiewen");
  const [age, setAge] = React.useState(27);
  const [inputName, setInputName] = React.useState("");

  const [show, setShow] = React.useState(true);

  // 1. useEffect 副作用函数，等于之前的生命周期函数
  // 2. 当useEffect没有任何依赖项，初始化调用一次，任何state更新他都会调用一次
  // 3. 根据第二个参数的依赖项进行调用
  // 4. 组件调用useEffect先调用清理函数cleanup，在执行setup函数
  useEffect(() => {
    console.log("update");
  }, [name]);

  return (
    <div>
      <div>
        姓名: {name} - <button onClick={() => setName("谢文")}>修改</button>
      </div>

      <div>
        年龄: {age} - <button onClick={() => setAge(29)}>修改</button>
      </div>
      <div>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => setShow((prev) => !prev)}>切换</button>
      </div>
      <hr />
      <div>{show && <Child name={inputName} />}</div>
    </div>
  );
};

export default Index;
