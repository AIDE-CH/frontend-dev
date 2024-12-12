
function fillGrid(table, physicists, phSelect, phDelete){
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
}