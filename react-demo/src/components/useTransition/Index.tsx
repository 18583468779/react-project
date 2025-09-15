import * as React from "react";
const Index: React.FC = () => {
  // useTransition 用于管理UI中的过渡状态，特别是在处理长时间运行的状态更新时。
  const [inputValue, setInputValue] = React.useState("");
  const [list, setList] = React.useState([]);
  const [isPending, setIsPending] = React.useTransition();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    fetch(
      "https://randomuser.me/api/?results=100&nat=US&inc=name&first=" + value
    )
      .then((res) => res.json())
      .then((data) => {
        setIsPending(() => {
          setList(data.results);
        });
      });
  };

  return (
    <div>
      Index
      <input type="text" value={inputValue} onChange={handleChange} />
      {isPending && <div>Loading...</div>}
      <br />
      <ul>
        {list.map((item: any, index: number) => (
          <li key={index}>{item.name.first + "-" + item.name.last}</li>
        ))}
      </ul>
    </div>
  );
};
export default Index;
