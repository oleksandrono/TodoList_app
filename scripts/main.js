let tasks = [];


if(localStorage.getItem("tasks")!==null){
    tasks = JSON.parse(localStorage.getItem("tasks"));
}
else if(localStorage.getItem("tasks")===undefined){
    tasks = [];
}

let addTaskForm = document.getElementById('addTaskForm');

addTaskForm.addEventListener('submit', (event)=>{
    event.preventDefault();
});

let submitAddTask = document.getElementById('addTaskSubmit');
submitAddTask.addEventListener('click', (event)=>{
    addTask();
});

//add task

function addTask(){

    let taskName = document.getElementById('taskName');
    let taskId = 0;
    if(tasks.length>0){
        tasks.forEach((element, index)=>{
            taskId = index;
        });  
    }
    else{
        taskId = 0;
    }

    tasks.push(taskName);
    
    if(taskName.value===''){
        taskName.style.borderBottomColor = 'red';
        setTimeout(()=>{
            taskName.style.borderBottomColor = 'gray';  
        } ,1000);
    }
    else{
        let parrentElement = document.getElementById('tasksList');

        let createTaskBlock = document.createElement('div');
        createTaskBlock.classList = 'task';
        createTaskBlock.id = 'task'+taskId;
        
        let createCheckbox = document.createElement('input');
        createCheckbox.type = 'checkbox';
        createCheckbox.id = 'checkbox'+taskId;
        createCheckbox.classList = 'checkbox';

        let createP = document.createElement('p');
        createP.id = 'taskName' + taskId;
        createP.textContent = taskName.value;
        
        let createButtonsBlock = document.createElement('div');
        createButtonsBlock.classList = 'buttons';

        let createChangeButton = document.createElement('button');
        createChangeButton.classList = 'button';
        createChangeButton.id = 'changeTask' + taskId;
        createChangeButton.textContent = 'Change';

        let createDeleteButton = document.createElement('button');
        createDeleteButton.classList = 'button';
        createDeleteButton.id = 'deleteTask' + taskId;
        createDeleteButton.textContent = 'Delete';


        parrentElement.appendChild(createTaskBlock);
        createTaskBlock.appendChild(createCheckbox);
        createTaskBlock.appendChild(createP);
        createTaskBlock.appendChild(createButtonsBlock);
        createButtonsBlock.appendChild(createChangeButton);
        createButtonsBlock.appendChild(createDeleteButton);

    }

    localStorage.setItem('tasks', tasks);
}