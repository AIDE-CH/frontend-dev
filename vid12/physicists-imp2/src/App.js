import './App.css';
import { useState } from 'react';
import { Physicist } from './js-common/physicist';
import PhysicistList from './Componenets/PhysicistList';
import PhysicistEdit from './Componenets/PhysicistEdit';

async function getAll(callback){
  try{
      const response = await fetch("http://localhost:3001/physicists");
      if(!response.ok){
          throw new Error(`Response status: ${response.status}`);
      }
      const data = await response.json();
      const arr = new Array();
      for(const obj of data){
          arr.push(new Physicist(obj.name, obj.birthYear, obj.birthPlace, obj.comments));
      }
      callback(arr);
  }catch(error){
      console.log(error.message);
  }
}

function App() {
  const [phAll, setPhAll] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [phCurr, setPhCurr] = useState(new Physicist("", "", "", ""));


  
  if(refresh){
    setRefresh(false);
    getAll(setPhAll);
  }
  return (
    <>
    <PhysicistEdit key={phCurr.name} phCurr={phCurr} setRefresh={setRefresh}/> 
    <hr/>
    <PhysicistList physicists={phAll} setPhCurr={setPhCurr} setRefresh={setRefresh}/>
    </>
  );
}

export default App;
