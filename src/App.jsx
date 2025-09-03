import { useState, useEffect } from 'react'
import './App.css'
import Signup from './pages/Signup';

// ---- ToDoForm ----
function ToDoForm({ addItemText, setAddItemText, todoItems, setToDoItems }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (addItemText.trim() === "") return;

    // Add new item with completed=false
    setToDoItems([...todoItems, { text: addItemText, completed: false }]);

    setAddItemText(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={addItemText}
        onChange={(e) => setAddItemText(e.target.value)}
        placeholder="Item.."
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

// ---- ToDoList ----
function ToDoList({ todoItems, setToDoItems }) {
  const handleDelete = (index) => {
    setToDoItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggle = (index) => {
    setToDoItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <ul>
      {todoItems.map((item, index) => (
        <li key={index} className="to-do-listItem">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleToggle(index)}
          />
          <label style={{ textDecoration: item.completed ? "line-through" : "none" }}>
            {item.text}
          </label>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

// ---- App ----
function App() {
  const [addItemText, setAddItemText] = useState("");
  const [todoItems, setToDoItems] = useState(() => {
    // Load from localStorage initially
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever todoItems changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <>
      <h2>To Do App</h2>
      <ToDoForm
        addItemText={addItemText}
        setAddItemText={setAddItemText}
        todoItems={todoItems}
        setToDoItems={setToDoItems}
      />
      <ToDoList todoItems={todoItems} setToDoItems={setToDoItems} />
      <Signup/>
    </>
  );
}

export default App;
