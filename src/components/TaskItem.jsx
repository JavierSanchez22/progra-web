export function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="task-checkbox"
      />
      <span className="task-name">{task.name}</span>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  );
}

export default TaskItem;