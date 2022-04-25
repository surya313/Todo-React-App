import logo from './logo.svg';
import './App.css';
import { useState,useEffect, useReducer } from 'react';

import {db} from './firebase-config';
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from "firebase/firestore";
import { async } from '@firebase/util';
import { MdDeleteForever } from 'react-icons/md'; 
import { GrFormEdit } from 'react-icons/gr';

function App() {

  const [id,setId] = useState('');
  const[todo,setTodo] = useState('');
  const [editTodo,setEditTodo] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [updatedTodo,setUpdatedTodo] = useState("");
  const [todos,setTodos] = useState([]);
  const [reducervalue,forceUpdate] = useReducer(x => x+1, 0);
  const todosCollectionRef = collection(db,"todo");
  

  const addTodo = async () => {

    await addDoc (todosCollectionRef, {todo: newTodo});
    forceUpdate();

  }

  const updateTodo = async (id,todo) => {

      setId(id);
      setTodo(todo);
      const filterTodos = todos.filter(todo => todo.id !== id);
      setTodos(filterTodos);
      const todoDoc = doc(db,"todo",id);
      await updateDoc(todoDoc, {todo : updatedTodo});
      
      setEditTodo(true);
     
  }
  const handleEdit = async (id) => {
    
    updateTodo(id);
    forceUpdate();
   
  }
  const handleback=() => {
      setEditTodo(false);
  }
  

  const deleteTodo = async (id) => {
    const todoDoc = doc(db,"todo",id);
    await deleteDoc(todoDoc);
    forceUpdate();

}


  useEffect(() => {
      const getTodos = async() => {

        const data = await getDocs(todosCollectionRef);
        console.log(data);
        setTodos(data.docs.map((doc) => ({...doc.data(),id: doc.id})));
      }

      getTodos();

  },[reducervalue])


  return (

    
    <div className="App">
      <div className='header'> 
        <h1>TODO APP</h1>
      </div>
      <label><h2>What's the plan for Today?</h2></label>
      <div>
      { editTodo ? (
        <>
        <div className='todo-list' >
        <input
        type="text"
        
        defaultValue={todo}
        
        onChange={(e) => setUpdatedTodo(e.target.value)}
         ></input>
        <button className='Edit-btn'  onClick={() => handleEdit(id)}>Edit Todo</button>
        <button className='Edit-btn'  onClick={() => handleback()}>back</button>
        </div>
        </>
      ) : (
        <>
        <div className='todo-list' >
        <input 
          type="text"
          
          onChange={(e) => setNewTodo(e.target.value)}
        ></input>
        
        <button onClick={addTodo}>Add Todo</button>
        </div>
        </>
      )

      }
      </div>
    
      

      {todos.map((todo) => {
          return (
            <div>

            
          <div className='todo-list' >
              
              <input 
                type="text"
                value={todo.todo}
              >
              </input>
            
              
              <button className='list-btn' onClick={() => updateTodo(todo.id,todo.todo)}><GrFormEdit size={15}/></button>
              <button className='list-btn' onClick={() => deleteTodo(todo.id)}><MdDeleteForever size={15}/></button>
              
              </div>
         </div>
          )
      })}

    </div>
  );
}

export default App;
