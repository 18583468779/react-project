import * as React from "react";

const SonRef = React.forwardRef((props, ref: any) => {
  const [formData, setFormData] = React.useState<any>({
    username: "",
    password: "",
  });
  React.useImperativeHandle(ref, () => {
    return {
      validate() {
        console.log("验证", formData);
        if (!formData.username) {
          alert("请输入用户名");
          return false;
        }
        if (formData.username.length < 6) {
          alert("用户名不能小于6位");
          return false;
        }
        if (!formData.password) {
          alert("请输入密码");
          return false;
        }

        return true;
      },
      submit() {
        ref.current?.submit();
      },
    };
  });

  return (
    <div>
      <form ref={ref} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="username"
          placeholder="请输入用户名"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="text"
          name="password"
          placeholder="请输入密码"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </form>
    </div>
  );
});

const Index2: React.FC = () => {
  const ref = React.useRef<any>(null);
  React.useEffect(() => {
    console.log(ref.current);
  }, []);
  return (
    <div>
      Index2
      <button onClick={() => ref.current?.validate()}>验证</button>
      <button onClick={() => ref.current?.submit()}>提交</button>
      <hr />
      <SonRef ref={ref} />
    </div>
  );
};

export default Index2;
