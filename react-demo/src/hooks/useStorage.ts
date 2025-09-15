import { useSyncExternalStore } from "react";

export const useStorage = (key: string, initValue: any) => {
  const subscribe = (callback: () => void) => {
    // 订阅浏览器api
    window.addEventListener("storage", callback);
    return () => {
      // 组件卸载时取消订阅
      window.removeEventListener("storage", callback);
    };
  };
  const getSnapshot = () => {
    // 获取最新状态
    const res = localStorage.getItem(key);
    return res ? JSON.parse(res) : initValue;
  };

  const res = useSyncExternalStore(subscribe, getSnapshot);
  const updateStorage = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    // 触发订阅
    window.dispatchEvent(new Event("storage"));
  };
  return [res, updateStorage];
};
