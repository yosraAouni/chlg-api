
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap'



function App() {
  const [users, setUsers] = useState();
  const [input, setInput] = useState({})
  const [error, setError] = useState();
  useEffect(() => {
    
    const fetchData=async()=>{
      try {
        const {data:{data}}=await axios.get("https://reqres.in/api/users?page=1")
        setUsers(data)
      } catch (err) {
        setError(err)
      }
      
    }
    fetchData()
  }, [])
    
    
    
  console.log(users);
  

  return (
    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
        {error && <p style={{color:"red"}}> can't load data </p>} 
        {users && users.map(el=> 
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={el.avatar} />
              <Card.Body>
                <Card.Title> {el.first_name} </Card.Title>
                <Card.Text>
                  {el.email}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
        </Card> )}
        <div style={{margin:'5%'}}>
        <input onChange={(e)=>setInput(e.target.value)} type='text'/>
        <button onClick={()=>setUsers([...users,{first_name:input}])}> submit </button>
        </div>
        
    </div>
  );
}

export default App;
