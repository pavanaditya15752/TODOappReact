import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [Editid, setEditid] = useState(0);
  


  const handleSubmit = (e) => {
    e.preventDefault();

    if(Editid){
      const editTodo=todos.find((i)=>i.id===Editid);
      const UpdatedTodos=todos.map((t)=>t.id===editTodo.id?(
        t={id:t.id,todo}):{id:t.id,todo:t.todo}
      );
      setTodos(UpdatedTodos);
      setEditid(0);
      setTodo("");
      return;
    }

    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo(""); 
    }

  }
  const handleEdit=(id)=>{
    const editTodo=todos.find((i)=>i.id===id);
    setTodo(editTodo.todo);
    setEditid(id);  
  }

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  return (
    <div className='App'>
      <div className='container'>
        <h1>TODO LIST</h1>
        <form className='todoform' onSubmit={handleSubmit}>
          <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)}></input>
          <button type='submit'>{Editid? "Edit":"Add"}</button>
        </form>
        <ul className='alltodos'>
          {
            todos.map((t) => (
              <li className='singletodo' key={t.id}>
                <span className='todotext'>{t.todo}</span>
                <button onClick={()=>handleEdit(t.id)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </li>
            ))
          }

        </ul>
      </div>
    </div>
  )
}

export default App;
