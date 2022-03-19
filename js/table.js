"use strict";

function chargeHome(){
    let currentPage = 1;
    let rowsPerPage = 5;
    let url = "https://60c28f19917002001739d2ee.mockapi.io/api/v1/Sugerencias/";
    let toSeach = null;
    refreshSuggestions(currentPage,rowsPerPage,url,toSeach);

    const newEntry = document.querySelector('#input-container').children;
    const newChapter = newEntry.title;
    const newSeason = newEntry.season;
    const newPremier = newEntry.premiere;
    const newScreenwriter = newEntry.screenwriter;
    const newDirector = newEntry.director;
    const newGag = newEntry.gag;

    let btnCreateX3 = document.getElementById('createX3');
    let btnSuggestions = document.getElementById('btn-suggestions');

    btnSuggestions.addEventListener("click",function (e){
        btnSuggestions.disabled = true;
        createEntry(e,newChapter,newSeason,newPremier,newScreenwriter,newDirector,newGag,currentPage,rowsPerPage,url);
        setTimeout(() => {
            btnSuggestions.disabled = false;
        }, 500);
    });

    btnCreateX3.addEventListener("click",function (e){
        btnCreateX3.disabled = true;
        createEntryX3(e,currentPage,rowsPerPage,newEntry,url);
        setTimeout(function(){
            btnCreateX3.disabled = false;
        },7000)
    });

    document.getElementById('delete').addEventListener("click",function (e){
        deleteEntry(currentPage,rowsPerPage,url);
    });

    document.getElementById('editable').addEventListener("click",function (e){
        editEntry(currentPage,rowsPerPage,url);
    });

    document.getElementById('allCheckbox').addEventListener("click",function (e){
        checkAll();
    });

    document.getElementById('searchInput').addEventListener("change", function (e){
        seachEntry(currentPage,rowsPerPage,url);
    });

}

async function createEntry(e,newChapter,newSeason,newPremier,newScreenwriter,newDirector,newGag,currentPage,rowsPerPage,url){
    e.preventDefault();
    
    await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            chapter: newChapter.value,
            season: newSeason.value,
            premiere: newPremier.value,
            screenwriter: newScreenwriter.value,
            director: newDirector.value,
            gag: newGag.value
        })
    })
    refreshSuggestions(currentPage,rowsPerPage,url,null);
}

async function refreshSuggestions(currentPage,rowsPerPage,urlToCompare,toSeach){
    const url = `https://60c28f19917002001739d2ee.mockapi.io/api/v1/Sugerencias?page=${currentPage}&limit=${rowsPerPage}`;
    
    try{
        let responseTable = await fetch(url);
        let responseJSON = await responseTable.json();
        let entries = responseJSON;
        
        let secondResponse = await fetch(urlToCompare);
        let secondJSON = await secondResponse.json();
        let secondEntries = [];
        if(toSeach != null){
            for (let i = 0; i < secondJSON.length; i++) {
                if(secondJSON[i].chapter.includes(toSeach)){
                    secondEntries.push(secondJSON[i]);
                }
            }
            entries = secondEntries;
        }
        else{
            secondEntries = secondJSON;
        }
        
        chargeTable(entries,rowsPerPage,currentPage);    
        initPagination(rowsPerPage,secondEntries,currentPage);
        addEventBtns(rowsPerPage,urlToCompare,toSeach);
    }
    catch(response){
        console.error();
    }
    
}

function createEntryX3(e,currentPage,rowsPerPage,entry,url){
    
   setTimeout(function(){

        setTimeout(function(){
            const newEntry = Object.create(entry);
            newEntry.title.value = "El patriotismo de Lisa";
            newEntry.season.value = "Temporada 3";
            newEntry.premiere.value = "26 de septiembre de 1991";
            newEntry.screenwriter.value = "George Meyer";
            newEntry.director.value = "Wes Archer";
            newEntry.gag.value = "La familia se sienta, y después Homer saca a Ayudante de Santa de debajo suyo.";
            createEntry(e,newEntry.title,newEntry.season,newEntry.premiere,newEntry.screenwriter,newEntry.director,newEntry.gag,currentPage,rowsPerPage,url);
        },1000);
        
        setTimeout(function(){
            const newEntry2 = Object.create(entry);
            newEntry2.title.value = "Mi bello jardinero",
            newEntry2.season.value = "Temporada 17",
            newEntry2.premiere.value = "26 de febrero de 2006",
            newEntry2.screenwriter.value = "Michael Price",
            newEntry2.director.value = "Bob Anderson",
            newEntry2.gag.value = "Versiones Claymation de los Simpson ruedan hacia el sillón."
            createEntry(e,newEntry2.title,newEntry2.season,newEntry2.premiere,newEntry2.screenwriter,newEntry2.director,newEntry2.gag,currentPage,rowsPerPage,url);

            newEntry2.title.value = "",
            newEntry2.season.value = "",
            newEntry2.premiere.value = "",
            newEntry2.screenwriter.value = "",
            newEntry2.director.value = "",
            newEntry2.gag.value = ""
        },2000);
        
        setTimeout(function(){
            const newEntry3 = Object.create(entry);
            newEntry3.title.value = "La casita del horror VII",
            newEntry3.season.value = "Temporada 8",
            newEntry3.premiere.value = "27 de octubre de 1996",
            newEntry3.screenwriter.value = "Dan Greaney",
            newEntry3.director.value = "Mike B. Anderson",
            newEntry3.gag.value = "La muerte está sentada en el sofá, y mata a la familia a medida que llegan."
            
            createEntry(e,newEntry3.title,newEntry3.season,newEntry3.premiere,newEntry3.screenwriter,newEntry3.director,newEntry3.gag,currentPage,rowsPerPage,url);
        },1000)

   },1000)

}

async function deleteEntry(currentPage,rowsPerPage,url){
    let checkboxStatus = document.querySelectorAll('.status');
    try{
        for (const i of checkboxStatus) {
            if(i.checked){
                let id = i.dataset.entry;
                let toDelete = Number(id);
                const response = await fetch(url+toDelete, {
                method: 'DELETE', 
                headers: {
                'Content-Type': 'application/json'
                 },
                 body: null
                 });
            }
        }
    }
    catch(response){
        console.error(response);
    }
    
    refreshSuggestions(currentPage,rowsPerPage,url,null);
}

async function editEntry(currentPage,rowsPerPage,url){
    const newEntry = document.querySelector('#input-container').children;
    const editChapter = newEntry.title.value;
    const editSeason = newEntry.season.value;
    const editPremier = newEntry.premiere.value;
    const editScreenwriter = newEntry.screenwriter.value;
    const editDirector = newEntry.director.value;
    const editGag = newEntry.gag.value;
    let checkboxStatus = document.querySelectorAll('.status');
    try{
        for (const i of checkboxStatus) {
            if(i.checked){
                let id = i.dataset.entry;
                let toEdit = Number(id);
                const response = await fetch(url+toEdit, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    chapter: editChapter,
                    season: editSeason,
                    premiere: editPremier,
                    screenwriter: editScreenwriter,
                    director: editDirector,
                    gag: editGag
                    })
                });
            }
        }
    }
    catch(response){
        console.error(response);
    }
    refreshSuggestions(currentPage,rowsPerPage,url,null);
}

function checkAll(){
    let btnCheckbox = document.getElementById('allCheckbox');
    let checkboxStatus = document.querySelectorAll('.status');
    for (const iterator of checkboxStatus) {
        if(btnCheckbox.checked){
            iterator.checked = true;
        }
        else{
            iterator.checked = false;
        }
    }
}

function initPagination(rowsPerPage,entriesJSON,currentPage){
    let wrapper = document.getElementById('pagination');
    wrapper.innerHTML = '';
    
    let entries = entriesJSON.length;
    let numberOfPages = Math.ceil(entries/rowsPerPage);
    let nextPage = currentPage;
    nextPage++;
    let nextX2Page = nextPage;
    nextX2Page++;
    let prevLastPage = numberOfPages;
    prevLastPage--;

    if(currentPage > 4){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${1}"> </input>`
        wrapper.innerHTML += `...`
    }

    if(currentPage == 4){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${1}"> </input>`
    }

    if(currentPage > 2){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${currentPage-2}"> </input>`

    }

    if(currentPage > 1){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${currentPage-1}"> </input>`
    }

    wrapper.innerHTML += `<input type = "button" class = "btnPagination" value = "${currentPage}"> </input>`
    
    if(nextPage < numberOfPages){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${nextPage}"> </input>`   
    }

    if(nextX2Page < numberOfPages){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${nextX2Page}"> </input>`   
    }

    if(nextX2Page < prevLastPage){
        wrapper.innerHTML += `...`
    }

    if(currentPage < numberOfPages){
        wrapper.innerHTML += `<input type = "button" class = "btnPagination" value= "${numberOfPages}"> </input>`
    }
    
}

function seachEntry(currentPage,rowsPerPage,url){
    let toSeach = document.getElementById('searchInput').value;
    refreshSuggestions(currentPage,rowsPerPage,url,toSeach);
}

function chargeTable(entries,rowsPerPage,currentPage){
    let suggestions = document.querySelector("#datatable");
     
    suggestions.innerHTML =
    `<tr>
        <th></th>
        <th>Capitulo</th>
        <th>Temporada</th>
        <th>Estreno</th>
        <th>Guionista</th>
        <th>Director</th>
        <th>Gag del sofa</th>
    </tr>`;

    currentPage--;
    let start = Number(rowsPerPage * (currentPage));
    let end = Number(start + rowsPerPage);
    let paginatedEntries = entries;
    if(paginatedEntries.length > 5){
        paginatedEntries = entries.slice(start,end);
    }
    
    for (const entry of paginatedEntries) {
        if(entry.screenwriter.includes("John Swartzwelder")){
            suggestions.innerHTML +=
            `<tr class = "highlightedEntry">
                <td><input type = "checkbox" data-entry = "${entry.id}" class = "status"></td>
                <td>${entry.chapter}</td>
                <td>${entry.season}</td>
                <td>${entry.premiere}</td>
                <td>${entry.screenwriter}</td>
                <td>${entry.director}</td>
                <td>${entry.gag}</td>
            </tr>`
        }
        else{
            suggestions.innerHTML +=
            `<tr>
                <td><input type = "checkbox" data-entry = "${entry.id}" class = "status"></td>
                <td>${entry.chapter}</td>
                <td>${entry.season}</td>
                <td>${entry.premiere}</td>
                <td>${entry.screenwriter}</td>
                <td>${entry.director}</td>
                <td>${entry.gag}</td>
            </tr>`
        }

    }

}

function addEventBtns(rowsPerPage,url,toSeach){
    let paginationButtons = document.querySelectorAll('.btnPagination');
    for(const btn of paginationButtons){
        btn.addEventListener('click', function (e){
            refreshSuggestions(btn.value,rowsPerPage,url,toSeach);
        })
    }
}
