// App.js

import React, { Component } from "react";
import Overview from "./Components/Overview";

class App extends Component {
  constructor() {
    super();

    this.state = {
      inputTask: "",
      tasks: [],
      count: 0,
      newTask: "",
      currentTask: {
        ind: 1,
        text: "",
        key: "",
        isEdit: false
      }
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNew = this.handleChangeNew.bind(this);
    this.resubmitTask2 = this.resubmitTask2.bind(this);
    this.onSubmitTask = this.onSubmitTask.bind(this);
    this.getIndexOfProp = this.getIndexOfProp.bind(this);
  }

  getIndexOfProp(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  handleChange = (e) => {
    this.setState((state) => ({
      inputTask: e.target.value,
      currentTask: {
        ...state.currentTask,
        text: e.target.value,
        key: Math.random().toString(36).substr(2, 9),
        isEdit: false
      }
    }));
  };

  handleChangeNew = (e) => {
    this.setState(
      (state) => ({
        newTask: e.target.value,
        currentTask: {
          ...state.currentTask,
          text: e.target.value
        }
      }),
      console.log(this.state.currentTask)
    );
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    const newItem = this.state.currentTask;
    if (newItem.text !== "") {
      const items = [...this.state.tasks, newItem];
      this.setState(
        (state) => ({
          tasks: items,
          count: state.count + 1,
          currentTask: {
            ...state.currentTask,
            text: "",
            key: "",
            isEdit: false
          },
          inputTask: ""
        }),
        () => {
          console.log(this.state.tasks);
        }
      );
    }
  };
  resubmitTask = (e) => {
    e.preventDefault();
    const index = this.state.tasks.indexOf(e.target.value);
    let tempArr = [...this.state.tasks];
    let item = { ...tempArr[index] };
    item = this.state.newTask;
    tempArr[index] = item;

    this.setState((state) => ({
      tasks: tempArr,
      newTask: ""
    }));
  };

  resubmitTask2 = (e, key) => {
    e.preventDefault();
    const newText = this.state.newTask;
    const newList = this.state.tasks.map((item) => {
      if (item.key === key) {
        const updatedItem = {
          ...item,
          text: newText,
          isEdit: !item.isEdit
        };
        return updatedItem;
      }
      return item;
    });
    if (newText !== "") {
      this.setState(
        {
          tasks: newList,
          newTask: ""
        },
        () => {
          console.log(this.state.tasks);
        }
      );
    }
  };

  deleteTask = (key) => {
    const currentTaskArray = [...this.state.tasks];
    const taskAfterDeleted = currentTaskArray.filter(
      (deletedTask) => deletedTask.key !== key
    );
    this.setState({
      tasks: taskAfterDeleted,
      count: this.state.count - 1
    });
  };

  editTask = (key) => {
    const newList = this.state.tasks.map((item) => {
      if (item.key === key) {
        const updatedItem = {
          ...item,
          isEdit: !item.isEdit
        };
        return updatedItem;
      }
      return item;
    });
    this.setState(
      {
        tasks: newList
      },
      () => {
        console.log(this.state.tasks);
      }
    );
  };

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={this.state.inputTask}
            type="text"
            id="taskInput"
          />
          <button type="submit">Add Task</button>
        </form>

        <Overview
          handleChangeNew={this.handleChangeNew}
          resubmitTask2={this.resubmitTask2}
          newTask={this.state.newTask}
          tasks={tasks}
          count={this.state.count}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
        />
      </div>
    );
  }
}

export default App;
