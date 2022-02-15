import React, { useState, useEffect } from "react";
import CreateTask from "components/CreateTask";
import { v4 as uuid } from "uuid";
import TaskList from "components/TaskList";
import moment from "moment";
import "./App.scss";
import { toast } from "react-toastify";
export default function App() {
  const [task, action] = useTask();
  if (task) {
    return (
      <div className="sotaTek-challenge">
        <div className="wrapper">
          <CreateTask onCreate={action.addNewTask} />
        </div>
        <div className="divider"></div>
        <div className="wrapper">
          <TaskList task={task} action={action} />
        </div>
      </div>
    );
  }
  return <p>waiting to restore data!</p>;
}
// custom hooks
const useTask = () => {
  // init tasks as null to wait for local storage restoration!
  const [tasks, updateTasks] = useState(null);

  const addNewTask = ({ title, description, dueDate, priority }) => {
    const newTask = {
      title,
      description,
      dueDate,
      priority,
      checked: false,
      id: uuid(),
    };

    updateTasks((old) => {
      try {
        return [...old, newTask].sort((left, right) => {
          return moment(left.dueDate).unix() - moment(right.dueDate).unix();
        });
      } catch (e) {
        return old;
      }
    });
    return toast("Thêm thành công!", { type: toast.TYPE.SUCCESS });
  };
  const updateExistTask = (updated) => {
    updateTasks((old) => {
      try {
        const result = old
          .map((task) => {
            if (task.id === updated.id) {
              return { ...updated, id: uuid() };
            }
            return task;
          })
          .sort(
            (left, right) =>
              moment(left.dueDate).unix() - moment(right.dueDate).unix()
          );

        return result;
      } catch (e) {
        return old;
      }
    });
    return toast("cập nhật thành công!", { type: toast.TYPE.SUCCESS });
  };
  const removeTask = (id) => {
    updateTasks((old) => old.filter((t) => t.id !== id));
    return toast("xóa thành công!", { type: toast.TYPE.SUCCESS });
  };
  const toggleStatusTask = (id, status) => {
    updateTasks((old) =>
      old.map((task) => {
        if (task.id === id) {
          return { ...task, checked: status };
        }
        return task;
      })
    );
  };
  const deleteBulk = () => {
    updateTasks((old) => old.filter((task) => !task.checked));
  };
  const dbKey = "localStorage-task";
  useEffect(() => {
    // restore task.
    try {
      const task = JSON.parse(localStorage.getItem(dbKey));

      if (typeof task?.length === "number") {
        // validate task
        if (task.every((t) => verifyTask(t))) return updateTasks(task);
      }
      updateTasks([]);
      return toast("khôi phục dữ liệu thành công!", {
        type: toast.TYPE.SUCCESS,
      });
    } catch (e) {
      toast("không thể khôi phục dữ liệu", { type: toast.TYPE.ERROR });
      return updateTasks([]);
    }
  }, []);
  useEffect(() => {
    try {
      if (typeof tasks?.length === "number") {
        localStorage.setItem(dbKey, JSON.stringify(tasks));
      }
    } catch (e) {
      return;
    }
  }, [tasks]);
  return [
    tasks,
    { addNewTask, updateExistTask, removeTask, toggleStatusTask, deleteBulk },
  ];
};
// validate task on restore!
const verifyTask = ({ title, dueDate, priority, description, id }) => {
  try {
    
    if (typeof title !== "string") throw new Error();
    if (!moment(dueDate).isValid()) throw new Error();
    if (typeof priority !== "string") throw new Error();
    if (typeof description !== "string") throw new Error();
    if (typeof id !== "string") throw new Error();

    return true;
  } catch (e) {
    console.log(false);
    return false;
  }
};
