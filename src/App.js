import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTask from "./Component/AddTask";
import TasksFilter from "./Component/TasksFilter";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const show = useSelector((state) => state.show);
  const updateFunc = (id) => {
    dispatch({ type: "update", payload: id });
  };
  const deleteFunc = (id) => {
    dispatch({ type: "delete", payload: id });
  };
  const taskState = (id) => {
    dispatch({ type: "change", payload: id });
  };
  const filter = () => {
    if (show == "done") {
      return tasks.filter((task) => task.done == true);
    }
    if (show == "notDone") {
      return tasks.filter((task) => task.done == false);
    }
    return tasks;
  };
  return (
    <div>
      <AddTask />
      <TasksFilter />
      {filter().map((task, i) => {
        return (
          <div style={{ margin: "3px" }} key={task.id}>
            <span
              style={
                task.done === true ? { textDecoration: "line-through" } : {}
              }
              onClick={() => taskState(task.id)}
            >
              {task.name}
            </span>
            <button onClick={() => deleteFunc(task.id)}>Delete</button>
            <button onClick={() => updateFunc(task.id)}>update</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
