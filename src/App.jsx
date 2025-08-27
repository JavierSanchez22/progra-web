import useLocalStorage from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

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

        <TaskList
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;