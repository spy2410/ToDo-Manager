import React, { useState, useEffect } from 'react';
import './App.css';

import Controller from './Controller.js';
import AddTask from './addTask';
export default function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks') == null ? "[]" : localStorage.getItem('tasks')));



  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div style={{ width: '100vw', height: '100%', padding: '1.2rem' }}>
      <h2>Todo List</h2>
      <AddTask setList={setTasks} />
      <Controller list={tasks} setList={setTasks} />
    </div>
  );
}
