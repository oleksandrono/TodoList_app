let tasks = [];

if (localStorage.getItem("tasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

let addTaskForm = document.getElementById("addTaskForm");

addTaskForm.addEventListener("submit", event => {
    event.preventDefault();
});

let submitAddTask = document.getElementById("addTaskSubmit");

submitAddTask.addEventListener("click", () => addTask());

function createTask(taskName, index) {
    let parrentElement = document.getElementById("tasksList");
    let addTask = document.getElementById("addTask");

    let createTaskBlock = document.createElement("div");
    createTaskBlock.classList = "task";
    createTaskBlock.id = "task" + index;

    let createCheckbox = document.createElement("input");
    createCheckbox.type = "checkbox";
    createCheckbox.id = "checkbox" + index;
    createCheckbox.classList = "checkbox";
    createCheckbox.setAttribute("onchange", `completedTask(${index})`);

    let createP = document.createElement("p");
    createP.id = "taskName" + index;
    createP.textContent = taskName;

    let createButtonsBlock = document.createElement("div");
    createButtonsBlock.classList = "buttons";
    createButtonsBlock.id = "buttons" + index;

    let createChangeButton = document.createElement("button");
    createChangeButton.classList = "button";
    createChangeButton.id = "changeTask" + index;
    createChangeButton.textContent = "Change";
    createChangeButton.setAttribute("onclick", "changeTask(event)");

    let createDeleteButton = document.createElement("button");
    createDeleteButton.classList = "button";
    createDeleteButton.id = "deleteTask" + index;
    createDeleteButton.textContent = "Delete";
    createDeleteButton.setAttribute("onclick", "deleteTask(event)");

    parrentElement.insertBefore(createTaskBlock, addTask);
    createTaskBlock.appendChild(createCheckbox);
    createTaskBlock.appendChild(createP);
    createTaskBlock.appendChild(createButtonsBlock);
    createButtonsBlock.appendChild(createChangeButton);
    createButtonsBlock.appendChild(createDeleteButton);
}

function addTask() {

    let task = {};

    let taskName = document.getElementById("taskName");

    if (taskName.value.length < 1) {
    taskName.style.borderBottomColor = "red";
    setTimeout(() => {
        taskName.style.borderBottomColor = "gray";
    }, 1000);
    } 
    else {
    let idList = [];
    tasks.forEach(element => {
        idList.push(element.taskId);
    });

    let taskId = 0;
    if (tasks === null) {
        taskId = 0;
    } 
    else if (tasks !== null) {
        for (let i = 0; i < tasks.length; i++) {
        taskId = Math.max.apply(null, idList) + 1;
        }
    }

    task.taskId = taskId;
    task.taskName = taskName.value;
    task.completed = false;
    task.listId = JSON.parse(localStorage.getItem('currentListId'));
    tasks.push(task);

    createTask(taskName.value, taskId);

    taskName.value = "";

    localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function outTaskAfterListChoosen(choosenListId) {
    clearTaskList();
    if(tasks.length>=1){
        tasks.forEach((element, index)=>{
            if(element.listId===choosenListId){
                createTask(element.taskName, element.taskId);
                if (element.completed === true) {
                    let taskElement = document.getElementById("task" + element.taskId);
                    taskElement.style.backgroundColor = "rgb(243, 243, 243)";
                    let checkbox = document.getElementById("checkbox" + element.taskId);
                    checkbox.checked = true;
                    let buttons = document.getElementById("buttons" + element.taskId);
                    buttons.firstChild.setAttribute("disabled", "true");
                    buttons.firstChild.nextSibling.setAttribute("disabled", "true");
                    document.getElementById('taskName'+element.taskId).style.textDecoration = 'line-through';
                }  
            }
        });
    }          
}

function clearTaskList(){
    tasks.forEach((element, index)=>{
        
        let removedElemendIdNum = element.taskId;

        let removedTask = document.getElementById('task'+removedElemendIdNum);
        if(removedTask!==null){
            removedTask.remove();
        }
    });
}

function deleteTask(event) {
    let regex = /\d+/;

    let deletedTaskIdNum = parseInt(event.target.id.match(regex));

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskId === deletedTaskIdNum) {
            tasks.splice(i, 1);
            let deletedTask = document.getElementById("task" + deletedTaskIdNum);
            deletedTask.remove();
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}

function changeTask(event) {
    let regex = /\d+/;

    let changedTaskIdNum = parseInt(event.target.id.match(regex));

    let parentElementForTask = document.getElementById("task" + changedTaskIdNum);

    let buttons = document.getElementById("buttons" + changedTaskIdNum);

    let taskName = parentElementForTask.firstChild.nextSibling;

    let createChangeBlock = document.createElement("div");
    createChangeBlock.classList = "change_task_block";
    createChangeBlock.id = "changeTaskBlock" + changedTaskIdNum;
    let createChangeInput = document.createElement("input");
    createChangeInput.className = "changeTaskInput";
    createChangeInput.id = "changeInput" + changedTaskIdNum;
    createChangeInput.placeholder = taskName.textContent;
    createChangeInput.value = taskName.textContent;
    createChangeInput.setAttribute('onkeydown', `applyChangeForKeypress(event, ${changedTaskIdNum})`);
    let createConfirmChange = document.createElement("button");
    createConfirmChange.className = "button";
    createConfirmChange.setAttribute("onclick", `confirmChange(${changedTaskIdNum})`);
    createConfirmChange.textContent = "Confirm change";

    let createCancelChange = document.createElement("button");
    createCancelChange.className = "button";
    createCancelChange.setAttribute("onclick",`cancelChange(${changedTaskIdNum})`);
    createCancelChange.textContent = "Cancel change";

    taskName.style.display = "none";
    buttons.style.display = "none";

    parentElementForTask.appendChild(createChangeBlock);
    createChangeBlock.appendChild(createChangeInput);
    createChangeBlock.appendChild(createConfirmChange);
    createChangeBlock.append(createCancelChange);
}

function confirmChange(changedTaskIdNum) {
    let changedInputField = document.getElementById("changeInput" + changedTaskIdNum);
    if (changedInputField.value.length < 1) {
        changedInputField.style.borderBottomColor = "red";
        setTimeout(() => {
            changedInputField.style.borderBottomColor = "gray";
        }, 1000);
    } 
    else {
        tasks.forEach((element, index) => {
            if (index === changedTaskIdNum) {
                tasks[index].taskName = changedInputField.value;

                localStorage.setItem("tasks", JSON.stringify(tasks));

                let parentElementForTask = document.getElementById("task" + changedTaskIdNum);
                let taskName = parentElementForTask.firstChild.nextSibling;
                taskName.remove();
                let buttons = document.getElementById("buttons" + changedTaskIdNum);
                buttons.style.display = "block";

                let createP = document.createElement("p");
                createP.id = "taskName" + index;
                createP.textContent = changedInputField.value;

                parentElementForTask.insertBefore(createP, buttons);

                parentElementForTask.lastChild.remove();
            }
        });

    changedInputField.value = "";
    }
}

function cancelChange(changedTaskIdNum) {
    let parentElementForTask = document.getElementById("task" + changedTaskIdNum);
    parentElementForTask.lastChild.remove();

    let buttons = document.getElementById("buttons" + changedTaskIdNum);

    let taskName = parentElementForTask.firstChild.nextSibling;

    taskName.style.display = "block";
    buttons.style.display = "block";
}

function applyChangeForKeypress(event, changedTaskIdNum){
    if(event.keyCode === 13){
        confirmChange(changedTaskIdNum);
    }
    else if(event.keyCode === 27){
        confirmChange(changedTaskIdNum);
    }
}

function completedTask(completedTaskIdNum) {
    let checkbox = document.getElementById("checkbox" + completedTaskIdNum);
    let taskElement = document.getElementById("task" + completedTaskIdNum);

    tasks.forEach((element, index) => {
        let buttons = document.getElementById("buttons" + index);
        if (completedTaskIdNum === index) {
            if (checkbox.checked == true) {
                taskElement.style.backgroundColor = "rgb(243, 243, 243)";
                tasks[index].completed = true;
                buttons.firstChild.setAttribute("disabled", "true");
                buttons.firstChild.nextSibling.setAttribute("disabled", "true");
                document.getElementById('taskName'+element.taskId).style.textDecoration = 'line-through';
            } 
            else {
                taskElement.style.backgroundColor = "inherit";
                tasks[index].completed = false;
                buttons.firstChild.removeAttribute("disabled", "true");
                buttons.firstChild.nextSibling.removeAttribute("disabled", "true");
                document.getElementById('taskName'+element.taskId).style.textDecoration = 'none';
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });
}

fetch('http://localhost:3000/some_data')
    .then((response)=>response.json())
    .then((myJson=>console.log(JSON.stringify(myJson))));


// source - "https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch" 