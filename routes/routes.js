const express = require('express');
const router = express.Router();

const { getAllDrivers, getDriverById, createDriver, updateDriverDetails, deleteDriverDetails } = require('../services/driver');
const { getAllTeams, getSingleTeam, createTeam, updateTeam, deleteTeam } = require('../services/teams');
const { getAllTasks, getSingleTask, cloneTask, getTaskStatus,  createTask, updateTask, completeTask, deleteTask} = require('../services/tasks');

//Driver or workers
router.get('/driver', getAllDrivers);
router.get('/driver/:driverId', getDriverById);
router.post('/driver', createDriver);
router.put('/driver/:driverId', updateDriverDetails);
router.delete('/driver/:driverId', deleteDriverDetails);

//teams
router.get('/teams', getAllTeams);
router.get('/teams/:id', getSingleTeam);
router.post('/teams', createTeam);
router.put('/teams/:id', updateTeam);
router.delete('/teams/:id', deleteTeam);

//tasks or orders
router.get('/tasks/all/:date', getAllTasks);
router.get('/tasks/:id', getSingleTask);
router.get('/tasks/:id', cloneTask);
// router.get('/tasks/:id', getTaskStatus);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.put('/tasks/:id/:status', completeTask);
router.delete('/tasks/:id', deleteTask);



module.exports = router;
