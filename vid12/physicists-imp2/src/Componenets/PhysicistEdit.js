import { useState } from "react";
import { Physicist } from "../js-common/physicist";

export default function PhysicistEdit({phCurr, setRefresh}){
    const [phName, setPhName] = useState(phCurr.name);
    const [phBirthYear, setPhBirthYear] = useState(phCurr.birthYear);
    const [phBirthPlace, setPhBirthPlace] = useState(phCurr.birthPlace);
    const [phComments, setPhComments] = useState(phCurr.comments);

    
  const phCancel = () => {
    setPhName("");
    setPhBirthYear("");
    setPhBirthPlace("");
    setPhComments("");
  };
  
  const phSave =  async () => {
    try{
        const phCurr = new Physicist( phName, phBirthYear, phBirthPlace, phComments);
        console.log(phCurr);
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

    return (
        <>
            <div>
                <input type="text" placeholder="Name of the physicist" value={phName}
                    onChange={(e)=>setPhName(e.target.value)}/> 
            </div>
            <div>
                <input type="number" placeholder="Year of birth" value={phBirthYear} 
                onChange={(e)=>setPhBirthYear(e.target.value)}/> 
            </div>
            <div>
                <input type="text" placeholder="Place of birth" value={phBirthPlace} 
                onChange={(e)=>setPhBirthPlace(e.target.value)}/> 
            </div>
            <div>
                <input type="text" placeholder="Write some theories or work"  value={phComments}
                onChange={(e)=>setPhComments(e.target.value)}/> 
            </div>
            <div>
                <button onClick={phSave}>Save</button>
                <button onClick={phCancel}>Canel</button>
            </div>
        </>
    );
}

