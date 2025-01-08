
import { Physicist } from '../js-common/physicist';
import { useState } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";

export default function PhysicistEdit() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);

    let phDefault = new Physicist("", "", "", "");
    if(location.state != null){
        phDefault = location.state;
    }
    const [phCurr, setPhCurr] = useState(phDefault);

  const phCancel = () => {
    setPhCurr(new Physicist("", "", "", ""));
    navigate("/");
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
        //setRefresh(true);
        navigate("/");
    }catch(ex){
        console.log(ex.message);
    }
  }
  
  const deletePhysicist = async () => {
    try{
        const confRes = window.confirm(`Are you sure you want to delete ${phCurr.name}?`);
        if(!confRes){
            return;
        }
        //const phCurr = new Physicist( physicist.name, null, null, null);
        
        const req_opts = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(phCurr)
        };
        const response = await fetch("http://localhost:3001/physicist/delete", req_opts);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}, Response: ${await response.text()}`);
        }

        console.log(`physicist (${phCurr.name}) is deleted`);
        //setRefresh(true);
        navigate("/");
    }catch(ex){
        console.log(ex.message);
    }
  }

  return (
    <>
        
        <div> {"passed id or index is " + id } </div>

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
            <button onClick={deletePhysicist}>Delete</button>
        </div>
    </>
  );
}