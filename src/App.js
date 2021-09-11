import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState([])
  const [message,setMessage]=useState("")
  useEffect(async () => {
    fetchTaskList()
  }, [])
  let fetchTaskList = async ()=>{
    try {
    let product = await axios.get("https://node-app-gopi.herokuapp.com/list-all-todo")
    console.log(product.data)
    setTodo([...product.data])
  } catch (error) {
    
  }}
  let handleCreateTask = async ()=>{
    try {
      let postData  =await axios.post("https://node-app-gopi.herokuapp.com/create-task",{message})
      fetchTaskList()
      setMessage("")
    } catch (error) {
      alert(error)
    }
  }
  let handleChange = async (e,id)=>{
    try {
      await axios.put(`https://node-app-gopi.herokuapp.com/update-task/${id}`,{status:e.target.checked})
      fetchTaskList()
    } catch (error) {
      
    }
  }
  let handleDelete = async (id)=>{
    try {
      await axios.delete(`https://node-app-gopi.herokuapp.com/delete-task/${id}`)
      fetchTaskList()
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className="container">
      <ul className="list-group">
      <div className="input-group mb-3">
        <input type="text" className="form-control" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Task..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button onClick={handleCreateTask} className="btn btn-outline-secondary" type="button" id="button-addon2">Add Task</button>
      </div>
        {
        todo.map((obj)=>{
          return (<li className="list-group-item d-flex justify-content-between align-items-start">
          <input className="form-check-input me-1" checked={obj.status} type="checkbox" value="" aria-label="..." onChange={(e)=>handleChange(e,obj._id)}/><span  style={{textDecoration:obj.status?"line-through":""}}>{obj.message}</span>
          <span class="badge bg-danger rounded-pill" onClick={()=>handleDelete(obj._id)}>X</span></li>
        )})
        }
      </ul>
    </div>
  );
}

export default App;
