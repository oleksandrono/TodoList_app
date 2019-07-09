let tasks = [];


if(localStorage.getItem("tasks")!==null){
    tasks = JSON.parse(localStorage.getItem("tasks"));
    outTaskAfterLoad();
}

let addTaskForm = document.getElementById('addTaskForm');

addTaskForm.addEventListener('submit', (event)=>{
    event.preventDefault();
});

let submitAddTask = document.getElementById('addTaskSubmit');

submitAddTask.onclick = ()=> addTask();


function createTask(taskName, index){
    let parrentElement = document.getElementById('tasksList');
    let addTask = document.getElementById('addTask');

    let createTaskBlock = document.createElement('div');
    createTaskBlock.classList = 'task';
    createTaskBlock.id = 'task'+index;
    
    let createCheckbox = document.createElement('input');
    createCheckbox.type = 'checkbox';
    createCheckbox.id = 'checkbox'+index;
    createCheckbox.classList = 'checkbox';

    let createP = document.createElement('p');
    createP.id = 'taskName' + index;
    createP.textContent = taskName;
    
    let createButtonsBlock = document.createElement('div');
    createButtonsBlock.classList = 'buttons';
    createButtonsBlock.id = 'buttons'+index;

    let createChangeButton = document.createElement('button');
    createChangeButton.classList = 'button';
    createChangeButton.id = 'changeTask' + index;
    createChangeButton.textContent = 'Change';
    createChangeButton.setAttribute('onclick', 'changeTask(event)');

    let createDeleteButton = document.createElement('button');
    createDeleteButton.classList = 'button';
    createDeleteButton.id = 'deleteTask' + index;
    createDeleteButton.textContent = 'Delete';
    createDeleteButton.setAttribute('onclick', 'deleteTask(event)');


    parrentElement.insertBefore(createTaskBlock, addTask);
    createTaskBlock.appendChild(createCheckbox);
    createTaskBlock.appendChild(createP);
    createTaskBlock.appendChild(createButtonsBlock);
    createButtonsBlock.appendChild(createChangeButton);
    createButtonsBlock.appendChild(createDeleteButton);
}

function addTask(){

    let task = {};

    let taskName = document.getElementById('taskName');

    if(taskName.value.length<1){
        taskName.style.borderBottomColor = 'red';
        setTimeout(()=>{
            taskName.style.borderBottomColor = 'gray';  
        } ,1000);
    }  
    else{
        //give task id
        let taskId = 0;
        if(tasks.length===0){
            taskId=0;
        }
        else if(tasks.length>0){
            taskId=tasks.length;
        }



        task.taskId = taskId;
        task.taskName = taskName.value;
        tasks.push(task);

        //add task
        createTask(taskName.value, taskId);

        taskName.value = '';

        localStorage.setItem('tasks', JSON.stringify(tasks));

    }
}

function outTaskAfterLoad(){
    if(tasks.length>=1){
        for(let task in tasks){
            createTask(tasks[task].taskName, tasks[task].taskId);
        }
    }
}

function deleteTask(event){ 
    
    let regex = /\d+/;

    let deletedTaskIdNum = parseInt(event.target.id.match(regex));

    for(let i = 0; i<tasks.length; i++){
        if(tasks[i].taskId === deletedTaskIdNum){
            tasks.splice(i, 1);
            let deletedTask = document.getElementById('task'+deletedTaskIdNum);
            deletedTask.remove();
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

}

function changeTask(event){
    let regex = /\d+/;

    let changedTaskIdNum = parseInt(event.target.id.match(regex));

    let parentElementForTask = document.getElementById('task'+changedTaskIdNum);

    let buttons = document.getElementById('buttons'+changedTaskIdNum);


    let taskName = parentElementForTask.firstChild.nextSibling;
    
    taskName.remove();
    let createChangeBlock = document.createElement('div');
    createChangeBlock.classList = 'change_task_block';
    createChangeBlock.id = 'changeTaskBlock'+changedTaskIdNum;
    let createChangeInput = document.createElement('input');
    createChangeInput.className = 'changeTaskInput';
    createChangeInput.id = 'changeInput'+changedTaskIdNum;
    createChangeInput.placeholder = taskName.textContent;
    let createChangeButton = document.createElement('button');
    createChangeButton.className = 'button';
    createChangeButton.setAttribute('onclick', `confirmChange(${changedTaskIdNum})`);  
    createChangeButton.textContent = 'Confirm change';

    parentElementForTask.insertBefore(createChangeBlock, buttons);
    createChangeBlock.appendChild(createChangeInput);
    createChangeBlock.appendChild(createChangeButton);    


}

function confirmChange(changedTaskIdNum){
    let changedInputField = document.getElementById('changeInput'+changedTaskIdNum);
    if(changedInputField.value.length<1){
        changedInputField.style.borderBottomColor = 'red';
        setTimeout(()=>{
            changedInputField.style.borderBottomColor = 'gray';  
        } ,1000);
    }
    else{
        
        tasks.forEach((element, index) => {
            if(index===changedTaskIdNum){
                element.taskName = changedInputField.value;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                
                let parentElementForTask = document.getElementById('task'+changedTaskIdNum);
                let taskName = parentElementForTask.firstChild.nextSibling;
                taskName.remove();

                let createP = document.createElement('p');
                createP.id = 'taskName' + index;
                createP.textContent = changedInputField.value;
                let buttons = document.getElementById('buttons'+changedTaskIdNum);
                parentElementForTask.insertBefore(createP, buttons);  

            }
        });

        changedInputField.value = '';
    }
}