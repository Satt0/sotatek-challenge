import React from "react";
import TaskItem from "components/TaskItem";
const filterTasksByTitle = (task = [], text = "") => {
  return task.filter((t) =>
    t.title.toLowerCase().match(text.toLowerCase().trim())
  );
};
export default function ShowTask({ list = [], action, filter = "" }) {
  return (
    <div>
      {filterTasksByTitle(list, filter).map((t) => (
        <TaskItem task={t} key={t.id} action={action} />
      ))}
    </div>
  );
}
