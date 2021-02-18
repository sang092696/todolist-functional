// Overview.js
import React, { Component } from "react";

class Overview extends Component {
  render() {
    return (
      <div>
        <div>Number of Tasks: {this.props.count}</div>
        <ul>
          {this.props.tasks.map((task) => {
            return (
              <li key={task.key}>
                {" "}
                {task.isEdit ? (
                  <div>
                    <input
                      type="text"
                      value={this.props.newTask}
                      onChange={this.props.handleChangeNew}
                    />{" "}
                    <button
                      onClick={(e) => this.props.resubmitTask2(e, task.key)}
                    >
                      Resubmit
                    </button>
                  </div>
                ) : (
                  <div>
                    {task.text}{" "}
                    <button
                      value={task.text}
                      onClick={() => this.props.editTask(task.key)}
                    >
                      Edit
                    </button>{" "}
                    <button onClick={() => this.props.deleteTask(task.key)}>
                      Delete
                    </button>
                  </div>
                )}{" "}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Overview;
