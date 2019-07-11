//get lists

let urlLists = 'http://localhost:4000/lists';

fetch(urlLists)
    .then((response)=>response.json())
    .then((myJson)=>{
        getLists(myJson);
    })
    .catch(error=>console.error(error));


let lists = [];

function getLists(data){
    if(data!==null){
        lists = data;
        outListAfterLoad();
    }
}


// if(localStorage.getItem('lists')!==null){
//     lists = JSON.parse(localStorage.getItem('lists'));
//     outListAfterLoad();
// }

document.getElementById('listNameField').addEventListener('keydown', ()=>addListWhenKeydown(event));
document.getElementById('submitCreateList').addEventListener('click', () => addList());

function addListWhenKeydown(event){
    if(event.keyCode === 13){
        addList();
    }
}

function addList(){
    let listNameField = document.getElementById('listNameField');
    if(listNameField.value.length<1){
        listNameField.style.borderBottomColor = "red";
        setTimeout(() => {
            listNameField.style.borderBottomColor = "gray";
        }, 1000);
    }
    else{
        let list = {};
        
        let listIdName = listNameField.value.split(' ').join('')
        list.listId = listIdName;
        lists.push(list);

        let listId = list.listId;

        outList(listNameField.value);


        postData(urlLists, {listId})
            .then(data=>console.log(JSON.stringify(data)))
            .catch(error => console.error(error));

        // localStorage.setItem('lists', JSON.stringify(lists));

        listNameField.value = '';
    }
}

function postData(urlLists = '', data){
    return fetch(urlLists, {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
    .then(response=>response.json());
}

function outList(listNameField){
    let parentElementForList = document.getElementById('lists');

    let listIdName = listNameField.split(' ').join('')

    let createLi = document.createElement('li');
    createLi.className = 'list';
    createLi.id = listIdName;
    createLi.textContent = listNameField;
    createLi.setAttribute('oncontextmenu', 'clearList(event)');
    createLi.setAttribute('onclick', 'chooseList(event)');

    parentElementForList.appendChild(createLi);
}

function outListAfterLoad(){
    lists.forEach((element, index)=>{
        outList(element.listId);
    });
}

function chooseList(event){
    let hintText = document.getElementById('hintText');
    hintText.style.display = 'none';
    let listNameText = document.getElementById('listName');
    listNameText.innerText = `in ${event.target.id}.`;

    document.getElementById('tasksList').style.display = 'block';
    document.getElementById('listName').style.visibility = 'visible';

    lists.forEach((element, index)=>{ 
        if(lists[index].listId===event.target.id){
            localStorage.setItem('currentListId', JSON.stringify(event.target.id));
            outTaskAfterListChoosen(event.target.id);
            document.getElementById('tasksList').style.display = 'block';
        }
    });  
}

function clearList(event){
    event.preventDefault();

    if(event.target.id === JSON.parse(localStorage.getItem('currentListId'))){
        document.getElementById('tasksList').style.display='none';
        document.getElementById('hintText').style.display = 'block';
        document.getElementById('listName').style.visibility = 'hidden';
    }

    lists.forEach((element, index)=>{;
        if(event.target.id===element.listId){
            console.log(index+1);
            fetch(urlLists+(index+1), {
                method: 'DELETE'
            })
            .then(response=>response.json())
            .catch(error=>console.error(error));

            lists.splice(index, 1); 

        }
    });

    let newArray = tasks.filter((element)=>{
        if(element.listId!==event.target.id){
            return element.listId;
        }

    });


    // localStorage.setItem('tasks', JSON.stringify(newArray));
    // localStorage.setItem('lists', JSON.stringify(lists));

    document.getElementById(event.target.id).remove();
                   
}

