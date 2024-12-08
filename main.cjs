const process = require('node:process');
const fs = require('node:fs')
const prompts = require('prompts')
const path = require('path')
const service = require('./task.service.cjs');
const figlet = require('figlet')


let input;
const fd = fs.openSync(path.join(process.cwd(),'/data','data.json'),'a',0o666);

figlet(
    'Task Tracker CLI',
    (err,data) => {
        if(err){
            console.log("figlet error");
            throw err
        }
        console.log(data);
    }
)

async function listenCMD() {
    do {

        input = await prompts(questions)
        input = extract(input.cmd);
        switch (input.p1) {
            case 'add':
                service.newTask(input.p3);
                break;
            case 'update':
                service.updateTaskById(input.p2,input.p3);
                break;
            case 'delete':
                service.deleteById(input.p2)
                break;
            case 'mark-in-progress':
                service.mark(input.p2,'in-progress');
                break;
            case 'mark-done':
                service.mark(input.p2,'done');
                break;
            case 'list':
                input.p2? service.listByStatus(input.p2) : service.getAllTask();
                break;
            case 'task':
                service.getTaskById(input.p2)
                break;
            case 'help':
                service.help();
                break;
            default:
                console.log(' none')
                break;
        }
        
        setTimeout(() => {
        },500)
    } while(input.p1 != 'stop');
}    

const questions = [
    {
        type: 'text',
        name: "cmd",
        message: 'task-cli'
    }
]

function extract(text){
    let Text = text.trim();
    Text = Text.split('"');        
    return {
        p1:Text[0].split(' ')[0].toLowerCase(),
        p2:Text[0].split(' ')[1]? Text[0].split(' ')[1].toLowerCase():null,
        p3:Text[1]? Text[1]:null
    }
}

// console.log(extract('mark-in-progress 1 '));

setTimeout(() => {
    listenCMD();
},100)