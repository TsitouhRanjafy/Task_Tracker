const data = require('./data/data.json')


const newTask = (task) => {
    data.push(task)  
}

const getAllTask = () => {
    return data? data:null;
}

const getLastId = () => {
    let len = data.length;
    return data[len-1]? data[len-1].id : 0;
}

const getTaskById = (id) => {
    return data[id-1]? data[id-1]:null;
}

const updateTaskById = (id,task) => {
    data.splice(--id,1,task)
}
const deleteById = (id) => {
    data.splice(--id,1,null)
}


module.exports = {
    newTask,
    getLastId,
    getAllTask,
    getTaskById,
    updateTaskById,
    deleteById
}
