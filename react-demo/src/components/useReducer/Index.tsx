import * as React from "react";

function reducer(state: { age: number }, action: any) {
  switch (action.type) {
    case "incremented":
      return { ...state, age: state.age + 1 };
    case "decremented":
      return { ...state, age: state.age - 1 };
    default:
      return state;
  }
  return state;
}

const Index: React.FC = () => {
  /**
   * useReducer 状态管理,在组件的顶层作用域调用
   *  useReducer(reducer, initialArg, init?)
   *  - reducer 状态更新纯函数。参数为state和action，返回值是更新后的state。state与action可以是任意合法值
   *  - initialArg 初始状态。初始值的计算逻辑取决于接下来的init参数
   *  - 可选参数 init：用于计算初始值的函数。如果存在，使用 init(initialArg) 的执行结果作为初始值，否则使用 initialArg。
   *  - 返回值：一个数组，包含两个元素：
   *    - state：当前状态值。
   *    - dispatch：用于触发状态更新的函数。
   */
  const [state, dispatch] = React.useReducer(reducer, { age: 42 });

  return (
    <div>
      <button onClick={() => dispatch({ type: "incremented" })}>
        增加年龄
      </button>
      <p>当前年龄：{state.age}</p>
      <button onClick={() => dispatch({ type: "decremented" })}>
        减少年龄
      </button>
    </div>
  );
};

export default Index;
