import React, { useState } from "react";
import style from "./style.module.scss";
import { toast } from "react-toastify";
const defaultState = {
  title: "",
  description: "",
  dueDate: "",
  priority: "n",
};
export default function TaskForm({
  onUpdate,
  onCreate,
  preload = false,
  type = "create",
  onClose = false,
}) {
  const [state, setState] = useState(preload ? preload : defaultState);
  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setState((s) => ({ ...s, [key]: value }));
  };
  const submitHandler = (event) => {
    event.preventDefault();
    try {
      switch (type) {
        case "create":
          return onCreate(state);
        case "update":
          onUpdate(state);
          if (typeof onClose === "function") onClose();
          return;
        default:
          return;
      }
    } catch (e) {
      toast("có lỗi xảy ra khi tạo task mới!", { type: toast.TYPE.ERROR });
    }
  };
  return (
    <form className={style.container} onSubmit={submitHandler}>
      <input
        required
        className={style.inputField}
        value={state.title}
        onChange={handleChange("title")}
        placeholder="Add new task..."
      />
      <div className={`${style.groupInput} ${style.groupMiddle}`}>
        <label>Description</label>
        <textarea
          required
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
            required
            value={state.dueDate}
            onChange={handleChange("dueDate")}
            type="date"
          />
        </div>
        <div className={style.groupInput}>
          <label>Priority</label>
          <select
            required
            value={state.priority}
            onChange={handleChange("priority")}
          >
            <option value="l">Low</option>
            <option value="n">Normal</option>
            <option value="h">High</option>
          </select>
        </div>
      </div>
      <div className={style.submit}>
        <button type="submit">
          {type === "create" && <span>Add</span>}
          {type === "update" && <span>Update</span>}
        </button>
      </div>
    </form>
  );
}
