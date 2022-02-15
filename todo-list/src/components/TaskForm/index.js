import React, { useState } from "react";
import style from "./style.module.scss";
const defaultState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "normal",
};
export default function TaskForm({ onUpdate, onCreate, preload = false }) {
  const [state, setState] = useState(preload ? preload : defaultState);
  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setState((s) => ({ ...s, [key]: value }));
  };
  return (
    <form className={style.container}>
      <input
        className={style.inputField}
        value={state.title}
        onChange={handleChange("title")}
        placeholder="Add new task..."
      />
      <div className={`${style.groupInput} ${style.groupMiddle}`}>
        <label>Description</label>
        <textarea
          rows={5}
          value={state.description}
          onChange={handleChange("description")}
          placeholder=""
        />
      </div>
      <div className={style.groupBottom}>
        <div className={style.groupInput}>
          <label>Due Date</label>
          <input
            value={state.dueDate}
            onChange={handleChange("dueDate")}
            type="date"
          />
        </div>
        <div className={style.groupInput}>
          <label>Priority</label>
          <select value={state.priority} onChange={handleChange("priority")}>
            <option>Normal</option>
          </select>
        </div>
      </div>
      <div className={style.submit}>
        <button>Add</button>
      </div>
    </form>
  );
}
