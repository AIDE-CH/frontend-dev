async function getAll(callback){
    try{
        const response = await fetch("/physicists");
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        const arr = new Array();
        for(const obj of data){
            arr.push(new Physicist(obj.name, obj.birthYear, obj.birthPlace, obj.comment));
        }
        callback(arr);
    }catch(error){
        bnr.addErr(error.message);
    }
}

function fillGrid(table, phSelect, phDelete){
    getAll( (physicists) =>{
        table.replaceChildren();
        const headerTexts = ["Name", "Year of Birth", "Place of Birth", "Comment", "Action"];
        const hTr = document.createElement("tr");
        for(const headerText of headerTexts){
            const th = document.createElement("th");
            th.innerText = headerText;
            hTr.appendChild(th);
        }
        table.appendChild(hTr);

        for(const ph of physicists){
            const tr = document.createElement("tr");

            for(const prop in ph){
                const td = document.createElement("td");
                td.innerText = ph[prop];
                tr.appendChild(td);
            }

            
            const tdAction = document.createElement("td");

            const selectButton = document.createElement("button");
            selectButton.innerText = "Edit";
            selectButton.addEventListener("click", () => phSelect(ph));
            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener("click", () => phDelete(ph));

            tdAction.appendChild(selectButton);
            tdAction.appendChild(deleteButton);

            
            tr.appendChild(tdAction);
            table.appendChild(tr); 
        }
    });
}