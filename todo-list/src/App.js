import React, { useState, useEffect } from "react";
import CreateTask from "components/CreateTask";

import TaskList from "components/TaskList";
import "./App.css"
export default function App() {
  const [task, actions] = useTask();
  return (
    <div className="sotaTek-challenge">
      <div className="wrapper">
      <CreateTask onCreate={actions.addNewTask} />
      </div>
      <div className="divider"></div>
      <div className="wrapper">
      <TaskList task={task} actions={actions}/>
      </div>
    </div>
  );
}
const useTask = () => {
  const [tasks, updateTasks] = useState([]);

  const addNewTask = (newTask) => {};
  const updateExistTask = (updatedTask) => {};
  const removeTask = (id) => {};
  const toggleStatusTask = (id, status) => {};
  useEffect(() => {
    // restore task.
  }, []);
  useEffect(() => {
    // backup to local storage.
  }, []);
  return [tasks, { addNewTask, updateExistTask, removeTask, toggleStatusTask }];
};
