import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import ShowTask from "./ShowTask";
import style from "./style.module.scss";

export default function TaskList({ task = [], action }) {
  const [filter, setFilter] = useState("");
  const isChecked = useMemo(() => {
    return task.some((t) => t.checked);
  }, [task]);
  const onFilterChange = useCallback((text = "") => {
    setFilter(text);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.groupList}>
        <p className="title">To Do List</p>
        <FilterTask task={task} onFilter={onFilterChange} />
        <ShowTask filter={filter} list={task} action={action} />
      </div>
      {isChecked && (
        <div className={style.bulkContainer}>
          <p>Bulk Action:</p>
          <div className={style.groupButtonBulk}>
            <button>Done</button>
            <button onClick={()=>{
              action?.deleteBulk();
              return toast("xoá thành công!",{type:toast.TYPE.SUCCESS})
            }}>Remove</button>
          </div>
        </div>
      )}
    </div>
  );
}
const FilterTask = ({ onFilter }) => {
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };
  useEffect(() => {
    let a;
    a = setTimeout(() => {
      onFilter(input);
    }, [150]);

    return () => {
      clearTimeout(a);
    };
  }, [input]);

  return (
    <div className={`${style.fitlerForm}`}>
      <input
        className="grayInputField"
        value={input}
        placeholder="Search..."
        onChange={handleChange}
      ></input>
    </div>
  );
};
