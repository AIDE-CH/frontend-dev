import './App.css';
import { useState } from 'react';
import { Physicist } from './js-common/physicist';

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

  const phCancel = () => {
    setPhCurr(new Physicist("", "", "", ""));
  };
  
  const phSave =  async () => {
    console.log(phCurr);
    try{
        const req_opts = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(phCurr)
        };
        const response = await fetch("http://localhost:3001/physicist/update", req_opts);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}, Response: ${await response.text()}`);
        }            
        
        console.log(`physicist (${phCurr.name}) is updated/added`);
        setRefresh(true);
    }catch(ex){
        console.log(ex.message);
    }
  }
  
  const deletePhysicist = async (physicist) => {
    try{
        const confRes = window.confirm(`Are you sure you want to delete ${physicist.name}?`);
        if(!confRes){
            return;
        }
        const phCurr = new Physicist( physicist.name, null, null, null);
        
        const req_opts = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(phCurr)
        };
        const response = await fetch("http://localhost:3001/physicist/delete", req_opts);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}, Response: ${await response.text()}`);
        }

        console.log(`physicist (${physicist.name}) is deleted`);
        setRefresh(true);
    }catch(ex){
        console.log(ex.message);
    }
  }

  
  if(refresh){
    setRefresh(false);
    getAll(setPhAll);
  }
  return (
    <>
     <div>
            <input type="text" placeholder="Name of the physicist" value={phCurr.name}
            onChange={(e)=>setPhCurr({name: e.target.value, birthYear: phCurr.birthYear, birthPlace: phCurr.birthPlace, comments: phCurr.comments})}/> 
        </div>
        <div>
            <input type="number" placeholder="Year of birth" value={phCurr.birthYear} 
            onChange={(e)=>setPhCurr({name: phCurr.name, birthYear: e.target.value, birthPlace: phCurr.birthPlace, comments: phCurr.comments})}/> 
        </div>
        <div>
            <input type="text" placeholder="Place of birth" value={phCurr.birthPlace} 
            onChange={(e)=>setPhCurr({name: phCurr.name, birthYear: phCurr.birthYear, birthPlace: e.target.value, comments: phCurr.comments})}/> 
        </div>
        <div>
            <input type="text" placeholder="Write some theories or work"  value={phCurr.comments}
            onChange={(e)=>setPhCurr({name: phCurr.name, birthYear: phCurr.birthYear, birthPlace: phCurr.birthPlace, comments: e.target.value})}/> 
        </div>
        <div>
            <button onClick={phSave}>Save</button>
            <button onClick={phCancel}>Canel</button>
        </div>
    <hr/>
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Year of Birth </th>
            <th> Place of Birth </th>
            <th> Comment </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {
            phAll.map( (physicist, idx) =>(
              <tr key={physicist.name}>
                <td> {physicist.name} </td>
                <td>{physicist.birthYear}</td>
                <td>{physicist.birthPlace}</td>
                <td>{physicist.comments}</td>
                <td>
                    <button onClick={ (e) => setPhCurr(physicist) }>Edit</button>
                    <button onClick={ (e) => deletePhysicist(physicist) }>Delete</button>
                </td>

              </tr>

            ) )
          }
        </tbody>
      </table>
    </>
  );
}

export default App;
