function TaskService() {
    this.getTaskListService = function () {
        return axios({
            url: "https://6006ddfd3698a80017de21d0.mockapi.io/api/Task",
            method: "GET",
        });
    }

    this.addTaskService = function (task) {
        return axios({
            url: "https://6006ddfd3698a80017de21d0.mockapi.io/api/Task",
            method: "POST",
            data: task,
        })
    }

    this.removeTaskService = function (id) {
        return axios({
            url: `https://6006ddfd3698a80017de21d0.mockapi.io/api/Task/${id}`,
            method: "DELETE",
        })
    }

    this.getTaskByIdService = function (id) {
        return axios({
            url: `https://6006ddfd3698a80017de21d0.mockapi.io/api/Task/${id}`,
            method: "GET",
        })
    }

    this.updateTaskStatusService = function (id, task) {
        return axios({
            url: `https://6006ddfd3698a80017de21d0.mockapi.io/api/Task/${id}`,
            method: "PUT",
            data: task,
        })
    }
}