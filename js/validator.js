function Validator() {
    this.inputValidate = function () {
        var task = getEle("newTask").value;
        var isValid = true;
        if (task == "") {
            isValid = false;
            return isValid;
        } else {
            return isValid;
        }
    }
    this.validateTask = function (taskName, taskList) {
        return taskList.checkNames(taskName);
    }
}