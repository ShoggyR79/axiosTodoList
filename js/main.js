function getEle(id) {
    return document.getElementById(id);
}

modalLoading.init(false);

var service = new TaskService();
var validator = new Validator();

function getTaskList() {
    service.getTaskListService()
        .then(function (result) {
            createTable(result.data)
        })
        .catch(function (err) {
            console.log(err);
        });
}

getEle("addItem").addEventListener("click", function () {
    if (!validator.inputValidate()) {
        alert("Please enter task");
        return;
    } else {
        addTask();
    }
})

function addTask() {
    var textTask = getEle("newTask").value;
    var task = new Task(textTask);
    modalLoading.init(true);

    service.addTaskService(task)
        .then(function () {
            getTaskList();
            modalLoading.init(false);

            alert("Create task successful");
        })
        .catch(function (error) {
            alert(error)
        });

    getEle("newTask").value = "";

}
function deleteTask(id) {
    modalLoading.init(true);
    service.removeTaskService(id)
        .then(function () {
            modalLoading.init(false);
            getTaskList();
            alert("Task deleted");
        })
        .catch(function (err) {
            alert(err);
        })
}

function updateTaskStatus(task) {
    if (task.status == "todo") {
        task.status = "completed";
    } else {
        task.status = "todo";
    }
}

function changeStatus(id) {
    modalLoading.init(true);
    service.getTaskByIdService(id)
        .then(function (result) {
            var newTask = result.data;
            updateTaskStatus(newTask);
            service.updateTaskStatusService(id, newTask)
                .then(function () {
                    modalLoading.init(false);
                    getTaskList();
                    alert("Task updated!");
                })
                .catch(function (err) {
                    alert(err);
                })
        })
        .catch(function (err) {
            alert(err);
        })
}


function createTable(arr) {
    var todoOutput = "";
    var completedOutput = "";
    for (var i = 0; i < arr.length; i++) {
        var status = (arr[i]).status;
        //draw todo tasks;
        if (status == "todo") {
            todoOutput += `<li>
            <span>${arr[i].textTask}</span>
            <div class="buttons">
              <button class="remove" onclick="deleteTask(${arr[i].id})"> <i class="fa fa-trash-alt"></i></button>
              <button class="complete" onclick="changeStatus(${arr[i].id})"><i class="far fa-check-circle"></i> </button>
            </div>
          </li>`
        }

        //draw completed tasks;
        else if (status == "completed") {
            completedOutput += `<li>
            <span>${arr[i].textTask}</span>
            <div class="buttons">
              <button class="remove" onclick="deleteTask(${arr[i].id})"> <i class="fa fa-trash-alt"></i></button>
              <button class="complete" onclick="changeStatus(${arr[i].id})"><i class="fas fa-check-circle"></i> </button>
            </div>
          </li>`
        }


    }
    getEle("todo").innerHTML = todoOutput;
    getEle("completed").innerHTML = completedOutput;
}

getTaskList();