import React, { useState } from "react";
import style from "./style.module.scss";
import TaskForm from "components/TaskForm";
export default function TaskItem({ action, task }) {
  const [show, setShow] = useState(false);

  const { updateExistTask, removeTask, toggleStatusTask } = action;
  return (
    <div className={style.container}>
      <div className={style.visible}>
        <div className={style.titleContainer}>
          <input
            type="checkbox"
            checked={task.checked}
            onChange={(e) => {
              const checked = e.target.checked;
              toggleStatusTask(task.id, checked);
            }}
          />

          <p>{task.title}</p>
        </div>
        <div className={style.groupButtons}>
          <button
            onClick={() => {
              setShow((s) => !s);
            }}
          >
            {show ? "Hide" : "Detail"}
          </button>
          <button
            onClick={() => {
              removeTask(task.id);
            }}
          >
            Remove
          </button>
        </div>
      </div>
      {show && (
        <div className={style.formContainer}>
          <TaskForm
            key={task.id}
            onClose={() => {
              setShow(false);
            }}
            type="update"
            onUpdate={updateExistTask}
            preload={task}
          />
        </div>
      )}
    </div>
  );
}
