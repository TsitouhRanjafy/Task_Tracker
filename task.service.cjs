const { chalk } = require("chalk");
const DA = require("./task.dataaccess.cjs");



const newTask = (description) => {
    let id = DA.getLastId();
    const task = {
        id:++id,
        desciption: description,
        status: "todo",
        createdAt: new Date,
        updatedAt: new Date,
    }
    
    DA.newTask(task);
    console.log("*New task added\n");
    console.log("       numero     : "+task.id);
    console.log("       Description: "+task.desciption);
    console.log("       Status     : "+task.status+"\n");
}

const getAllTask = () => {
    const data = DA.getAllTask();
    if (!data) return;
    data.forEach((element) => {
        if (element.id) {
            console.log("       numero     : "+element.id);
            console.log("       Description: "+element.desciption);
            console.log("       Status     : "+element.status+"\n");
        }
    });
}

const getTaskById = (id) => {
    const data = DA.getTaskById(id)
    if (!data || !data.id) return;
    console.log("       numero     : "+data.id);
    console.log("       Description: "+data.desciption);
    console.log("       Status     : "+data.status+"\n");
}

const updateTaskById = (id,description) => {
    const lastData = DA.getTaskById(id);
    if (!lastData) {
        console.log("*Id not found\n");
        return;
    }
    const task = {
        id:lastData.id,
        desciption: description,
        status: lastData.status,
        createdAt: lastData.createdAt,
        updatedAt: new Date,
    }
    DA.updateTaskById(id,task);
    console.log("*Task deleted\n");
}

const deleteById = (id) => {
    DA.deleteById(id);
    console.log("*Task "+id+" deleted");
}

const mark = (id,status) => {
    const data = DA.getTaskById(id);
    if (!data) {
        console.log("*Not found");
        return
    };
    data.status = status
    DA.updateTaskById(id,data)
}

const listByStatus = (status) => {
    const data = DA.getAllTask();

    data.forEach((element) => {
        if (element && (element.status == status)){
            console.log("       numero     : "+element.id);
            console.log("       Description: "+element.desciption);
            console.log("       Status     : "+element.status+"\n");
        }
    })
}

const help = () => {
    console.log("\t add <description>           Add a new task");
    console.log("\t update <id> <description>   update task");
    console.log("\t delete <id>                 delete one task ");
    console.log("\t mark-in-progress <id>       mark one task in progress");
    console.log("\t mark-done <id>              mark one done");
    console.log("\t list                        list all task ");
    console.log("\t list <param>                list task by [done,todo,in-progress]");
    console.log("\t task <id>                   get task by id");
    console.log("\t stop                        stop the programme");
}

module.exports = {
    newTask,
    getAllTask,
    getTaskById,
    updateTaskById,
    deleteById,
    mark,
    help,
    listByStatus
}


