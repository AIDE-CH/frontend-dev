import { Physicist } from "../js-common/physicist";

export default function PhysicistList({physicists, setPhCurr, setRefresh}){

  
  
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
    return ( <table>
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
          physicists.map( (physicist, idx) =>(
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
      </table> );
}
