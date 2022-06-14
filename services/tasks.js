const { onfleetApi } = require('../config/config');
const getAllTasks = async (req, res) => { 
    //list tasks
    const date = Date.parse(req.params.date, 'YYYY-MM-DD');
    try {
        const tasks = await onfleetApi.tasks.get({ "from": date });
        res.send(tasks);
    } catch (err) { 
        console.log(err);
    }
}

const getSingleTask = async(req, res) => { 
    const taskId = req.params.id;
    try {
        const task = await onfleetApi.tasks.get(taskId);
        const { id, timeCreated, timeLastModified, organisation, trackingURL, worker, state } = task;
        const { success } = task.completionDetails;
        const taskDetails = {
            id,
            timeCreated,
            timeLastModified,
            organisation,
            trackingURL,
            worker,
            success
        };

        if (state === 0) {
            taskDetails.state = 'Unassigned';
        } else if (state === 1) {
            taskDetails.state = 'Assigned';
        } else if (state === 2) {
            taskDetails.state = 'Active';
        } else {
            taskDetails.state = 'Completed';
            delete taskDetails.trackingURL;
        } 

        if (success === false) {
            let { failureReason } = task.completionDetails;
            taskDetails.failureReason = failureReason;
        }
        
        res.send(taskDetails)
    } catch (err) { 
        console.log(err);
    }
}

const cloneTask = async(req, res) => { 
    const taskId = req.params.id;
    try {
        const task = await onfleetApi.tasks.clone(taskId);
        res.send(task.id)
    } catch (err) { 
        console.log(err)
    }
}

const getTaskStatus = async(req, res) => { 
    const taskId = req.params.id;
    try {
        const task = await onfleetApi.tasks.get(taskId)
        
    } catch (err) { 
        console.log(err);
    }
}

const createTask = async(req, res) => { 
    const taskDetails = req.body;
    try {
        const task = await onfleetApi.tasks.create(taskDetails);
        res.send(task.id);
    } catch (err) { 
        console.log(err);
    }
}

const updateTask = async(req, res) => { 
    const taskId = req.params.id;
    try {
        const updateTask = await onfleetApi.tasks.update(taskId, req.body);
        res.send(updateTask);
    } catch (err) { 
        console.log(err);
    }
}

const completeTask = async() => { 
    const taskId = req.params.id;
    const completeStatus = req.params.status;
    try {
        if (completeStatus === true) { 
            await onfleetApi.tasks.forceComplete(taskId, { "completionDetails": { "success": true } });
        } else {
            await onfleetApi.tasks.forceComplete(taskId, { "completionDetails": { "success": false } });
        }
        const task = await onfleetApi.tasks.get(taskId);
        res.send(task.completionDetails);

    } catch (err) { 
        console.log(err)
    }
}

const deleteTask = async(req,res) => { 
    try {
        const response = await onfleetApi.tasks.deleteOne(req.params.id);
        res.send(response);
    } catch (err) { 
        console.log(err)
    }
}

module.exports = { getAllTasks, getSingleTask, cloneTask, getTaskStatus, createTask, updateTask, completeTask, deleteTask };
