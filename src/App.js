import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super()
    this.state = {
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      newTask: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleToggleTask = this.handleToggleTask.bind(this);
  }

  handleInputChange(event) {
    this.setState({ newTask: event.target.value });
  }

  handleCreateTask(event) {
    event.preventDefault();
    if (this.state.newTask.length > 0) {
      const newId = this.state.tasks.length + 1;
      const newTask = { id: newId, name: this.state.newTask, done: false };
      const tasks = [...this.state.tasks, newTask];
      this.setState({ tasks: tasks, newTask: '' });
      
    } else {
      const inputField = document.getElementById("new-task");
      if (inputField) {
        inputField.classList.add("error");
      }
        }
  }

  handleToggleTask(event) {
    const taskId = parseInt(event.target.id);
    const tasks = [...this.state.tasks];
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (!tasks[taskIndex].done) {
      tasks[taskIndex].done = true;
      event.target.classList.add("done");
    } else {
      tasks[taskIndex].done = false;
      event.target.classList.remove("done");
    }
    this.setState({ tasks: tasks });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.tasks.map(task => (
              <li key={task.id} 
                className={task.done ? "done" : ""} 
                id={task.id} onClick={this.handleToggleTask}>
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.handleCreateTask}>
            <input type="text" id="new-task" 
              placeholder="Ingresa una tarea y oprime Enter" 
              value={this.state.newTask} 
              onChange={this.handleInputChange}
              className={this.state.newTask.length === 0 ? "error" : ""} />
            <button type="submit">Agregar</button>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
