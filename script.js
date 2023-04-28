function newElement() {
    var inputValue = document.getElementById("myInput").value;
    var dueDateValue = document.getElementById("myDate").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        var task = {text: inputValue, completed: false, dueDate: dueDateValue};
        createNewTaskElement(task);
        saveTaskToLocalStorage(task);
    }
    document.getElementById("myInput").value = "";
    document.getElementById("myDate").value = "";
}

function saveTaskToLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('de-DE', options);
}


function createNewTaskElement(task) {
    var li = document.createElement("li");
    if(task.completed){
        li.classList.add("checked");
    }
    var t = document.createTextNode(task.text + " (Fällig am: " + formatDate(task.dueDate) + ")");
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    

    var editSpan = document.createElement("SPAN");
    var editText = document.createTextNode("✎"); 
    editSpan.className = "edit";
    editSpan.appendChild(editText);
    li.appendChild(editSpan); // Add this right after the 'close' button

    li.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('checked');
            task.completed = !task.completed;
            updateTaskInLocalStorage(task);
        }
    }, false);

    span.onclick = function() {
        var div = this.parentElement;
        removeTaskFromLocalStorage(task);
        div.style.display = "none";
    }

    editSpan.onclick = function() {
        var newTaskText = prompt("Edit task text:", task.text);
        if (newTaskText) {
            var newDueDate = prompt("Edit due date:", task.dueDate);
            if (newDueDate) {
                // Remove old task
                removeTaskFromLocalStorage(task);
                var div = this.parentElement;
                div.style.display = "none";

                // Add new task
                var updatedTask = {text: newTaskText, completed: task.completed, dueDate: newDueDate};
                createNewTaskElement(updatedTask);
                saveTaskToLocalStorage(updatedTask);
            }
        }
    }
}


function loadTasksFromLocalStorage() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        createNewTaskElement(task);
    });
}

function removeTaskFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks = tasks.filter(t => t.text !== task.text);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks = tasks.map(t => t.text === task.text ? task : t);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasksFromLocalStorage();
