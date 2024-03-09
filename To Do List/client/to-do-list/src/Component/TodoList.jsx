import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
   const [todos, setTodos] = useState([]);
   const [text, setText] = useState('');
   const [editingId, setEditingId] = useState(null);
   const [editText, setEditText] = useState('');
 
   useEffect(() => {
     fetchTodos();
   }, []);
 
   const fetchTodos = async () => {
     try {
       const response = await axios.get('http://localhost:5000/todos');
       setTodos(response.data);
     } catch (error) {
       console.error('Error fetching todos:', error);
     }
   };
 
   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       if (!text.trim()) return;
       if (editingId) {
         await axios.put(`http://localhost:5000/todos/${editingId}`, { text: editText });
         setEditingId(null);
         setEditText('');
       } else {
         await axios.post('http://localhost:5000/todos', { text });
       }
       setText('');
       fetchTodos();
     } catch (error) {
       console.log(error);
     }
   };
 
   const handleDelete = async (id) => {
     try {
       await axios.delete(`http://localhost:5000/todos/${id}`);
       fetchTodos();
     } catch (error) {
       console.log(error);
     }
   };
 
   const handleEdit = (id, text) => {
     setEditingId(id);
     setEditText(text);
   };
 
   return (
     <div className="container mx-auto p-4">
       <h1 className="text-3xl text-center font-bold mb-6">To-Do List</h1>
       <form onSubmit={handleSubmit} className="mb-6 flex">
         <input 
           type="text" 
           value={text} 
           onChange={(e) => setText(e.target.value)} 
           placeholder="Enter a new todo" 
           className="border border-gray-400 rounded px-4 py-2 mr-2 focus:outline-none flex-grow"
         />
         <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none">
           {editingId ? 'Save Todo' : 'Add Todo'}
         </button>
       </form>
       <ul>
         {todos.map(todo => (
           <li key={todo._id} className="flex items-center justify-between border-b border-gray-400 py-4">
             {editingId === todo._id ? (
               <input 
                 type="text" 
                 value={editText} 
                 onChange={(e) => setEditText(e.target.value)} 
                 className="border border-gray-400 rounded px-4 py-2 mr-2 focus:outline-none"
               />
             ) : (
               <span className="text-lg">{todo.text}</span>
             )}
             <div>
               {editingId === todo._id ? (
                 <button 
                   onClick={(e) => handleSubmit(e)} 
                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mr-2"
                 >
                   Save
                 </button>
               ) : (
                 <button 
                   onClick={() => handleEdit(todo._id, todo.text)} 
                   className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none mr-2"
                 >
                   Edit
                 </button>
               )}
               <button 
                 onClick={() => handleDelete(todo._id)} 
                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
               >
                 Delete
               </button>
             </div>
           </li>
         ))}
       </ul>
     </div>
   );
 }
 
 export default TodoList;
 