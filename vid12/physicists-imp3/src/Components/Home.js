
import { Physicist } from '../js-common/physicist';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Home(){
    const [phAll, setPhAll] = useState([]);
    const [refresh, setRefresh] = useState(true);

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

    if(refresh){
        setRefresh(false);
        getAll(setPhAll);
    }

    return(<>
    
    <Link to={"/physicist/-1"} state={null}> + </Link>
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
                    <Link to={"/physicist/" + idx} state={physicist}>Edit</Link>
                </td>

              </tr>

            ) )
          }
        </tbody>
      </table>
    </>);
}