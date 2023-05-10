import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
const [users,setUsers]=useState([]);
useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res=>res.json())
  .then(data=>setUsers(data))
},[])
const handleAddUser=event=>{
  event.preventDefault();
  const form=event.target;
  const name=form.name.value;
  const email=form.email.value;
  const user={name,email}
  console.log(user)
  fetch('http://localhost:5000/users',{
    method:'POST',
    headers:{
      'content-type':'application/json'
    },
    body:JSON.stringify(user)

  })
  .then(res=>res.json())
  .then(data=>{
    console.log('inside post response', data); 
const newUser=[...users,data];
setUsers(newUser);
form.reset();
  })
}
  return (
    <>
     <h2>User Management System</h2>
     <h3>Numbers of user:{users.length}</h3>
     <form onSubmit={handleAddUser}>
      <input type="text"name="name" /> <br />
      <input type="email"name="email" /><br />
      <input type="submit"value="Add User" />

     </form>
     {
      users.map(user=><p key={user.id}>{user.id}. {user.name} {user.email}</p> )
     }
    </>
  )
}

export default App
