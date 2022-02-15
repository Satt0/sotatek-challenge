import React from "react";
import style from "./style.module.scss";
import TaskForm from "components/TaskForm";
export default function CreateTask({ onCreate }) {
  return (
    <div className={style.container}>
      <p className="title">New Task</p>
      <TaskForm type="create" onCreate={onCreate} />
    </div>
  );
}
