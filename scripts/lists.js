let urlLists = 'http://localhost:3000/lists';

fetch(urlLists)
    .then((response)=>response.json())
    .then((data)=>{
        getLists(data);
    })
    .catch(error=>console.error(error));

let lists = [];

function getLists(data){
    if(data!==null){
        lists = data;
        outListAfterLoad();
    }
}

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

        let idList = [];
        lists.forEach((element, index) => {
            idList.push(element.id);
        });

        let listId = 1;
        if (lists === null) {
            listsId = 1;
        } 
        else if (lists !== null) {
            for (let i = 1; i <= lists.length; i++) {
                listId = Math.max.apply(null, idList) + 1;
            }
        }

        let list = {};

        list.id = listId;
        list.listName = listNameField.value;
        lists.push(list);

        outList(listNameField.value, listId);

        postData(urlLists, list)
            .catch(error => console.error(error));

        listNameField.value = '';
    }
}

function outList(listNameField, listId){
    let parentElementForList = document.getElementById('lists');

    let createLi = document.createElement('li');
    createLi.className = 'list';
    createLi.id = listId;
    createLi.textContent = listNameField;
    createLi.setAttribute('oncontextmenu', 'clearList(event)');
    createLi.setAttribute('onclick', `chooseList(event)`);

    parentElementForList.appendChild(createLi);
}

function outListAfterLoad(){
    lists.forEach((element, index)=>{
        outList(element.listName, element.id);
    });
}

function chooseList(event){

    lists.forEach((element, index)=>{

        if(event.target.id==element.id){

            let hintText = document.getElementById('hintText');
            hintText.style.display = 'none';
            let listNameText = document.getElementById('listName');
            listNameText.innerText = `in ${element.listName}.`;    
            document.getElementById('tasksList').style.display = 'block';

            localStorage.setItem('currentListId', JSON.stringify(event.target.id));

            outTaskAfterListChoosen(event.target.id); 
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

    lists.forEach((element, index)=>{
        if(element.id==event.target.id){

            deleteData(urlLists, element.id)
                .catch(error=>console.log(error));

            lists.splice(index, 1); 

        }
    });

    document.getElementById(event.target.id).remove();
                   
}