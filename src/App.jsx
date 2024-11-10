import { useReducer } from 'react';
import ACTIONS from './utilities/todoTrackerActions.mjs';
import todoTracker from './utilities/todoTracker.mjs'
import './App.css';

const initialState = {
  todos: [], // Array to store todo items
  formData: { desc: '', complete: false } 
};

const Todos = () => {
  const [state, dispatch] = useReducer(todoTracker, initialState);


  function handleSubmit(e) {
    e.preventDefault(); // Prevents page from reloading

    if (state.formData.desc) {
      // Only add todo if description is not empty
      dispatch({ type: ACTIONS.ADD_TODO, payload: state.formData.desc });
      dispatch({ type: ACTIONS.RESET_FORM }); // Reset form data after submission
    }else {
      alert("Please enter a description for your adventure!"); // Alert for empty submissions
    }
  }

  // Handler for input changes
  function handleChange(e) {
    dispatch({ type: ACTIONS.SET_FORM_DATA, payload: e.target.value });
  }

  // Handler for editing todos
  function handleEdit(id) {
    const newDesc = prompt("Edit your adventure:", state.todos.find(todo => todo.id === id).desc);
    if (newDesc !== null) {
      dispatch({ type: ACTIONS.EDIT_TODO, payload: { id, desc: newDesc } });
    }
  }

  return (
    <main>
      <h1>Adventure Tracker</h1>
      <p>Ready to embark on a new adventure? Track your unique goals!</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What’s your next adventure?"
          value={state.formData.desc} // Controlled input tied to formData
          onChange={handleChange} // Update form data on change
        />
        <br />
        <input type="submit" value="Add Adventure" />
      </form>

      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.complete ? "line-through" : "none" }}>
            <input 
              type="checkbox" 
              checked={todo.complete} 
              onChange={() => dispatch({ type: ACTIONS.TOGGLE_COMPLETE, payload: todo.id })}
            />
            {todo.desc}
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
            <button onClick={() => dispatch({ type: ACTIONS.DELETE_ITEM, payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Todos;
