import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  const addTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleComplete = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Task Manager</h1>
        
        <TaskForm onAddTask={addTask} />
        
        <TaskFilter filter={filter} setFilter={setFilter} />
        
        <div className="task-stats">
          Total: {tasks.length} | 
          Completed: {tasks.filter(t => t.completed).length} | 
          Pending: {tasks.filter(t => !t.completed).length}
        </div>

        <TaskList
          tasks={tasks}
          filter={filter}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;