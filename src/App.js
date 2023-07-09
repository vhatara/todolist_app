import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const getTasks = () => {
    axios.get('http://localhost:3001/tasks')
      .then(res => {
        console.log(res);
        setTasks(res.data);
      })
      .catch(err => console.error(err));
  }

  const addTasks = () => {
    axios.post('http://localhost:3001/tasks', {task})
      .then(res => {
        console.log(res);
        getTasks();
      })
      .catch(err => console.error(err));
    setTask('')
  }

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = id => {
    console.log(tasks);
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
          axios.delete(`http://localhost:3001/tasks/${id}`)
          .then(res => {
            console.log(res);
            getTasks();
          })
          .catch(err => console.error(err))
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
      }
        
  const toggleComplete = id => {
    setTasks(tasks.map(task => task.id === id ? {
      id: task.id,
      task: task.task,
      completed:!task.completed
    } : task))}


  return (
    <main>
      <h1 className='text-white text-center'>Get Things Started!</h1>
      <div className='todo'>

        <form>
          <input type="text" placeholder="Enter task" value={task} onChange={(event) => setTask(event.target.value)}/>
          <button onClick={() => addTasks()}><i class="bi bi-plus-circle-fill"></i></button>
        </form>

          {tasks.map(task => 
            <div className="d-flex justify-content-between task">
              <div>
                  <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ""}`} key={task.id}>{task.task}</p>                
              </div>
              <div>
                <button className="deletebtn" onClick={() => deleteTask(task.id)}><i class="bi bi-trash-fill"></i></button>
              </div>
            </div>
          )}

      </div>
  </main>
  );
}

export default App;
