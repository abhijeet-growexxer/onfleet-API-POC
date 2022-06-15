const { onfleetApi } = require('../config/config');

const getAllDrivers = async(req,res) => {
    try {
        const workerList = await onfleetApi.workers.get();
        res.send(workerList);
    }
    catch (err) { 
        console.log(err);
    }
}

const getDriverById = async(req,res) => {
    try {
        const workerId = req.params.driverId;
        const worker = await onfleetApi.workers.get(workerId, {"analytics": true});
        res.send(worker);
    } catch (err) { 
        console.log(err);
    }
}

const createDriver = async(req,res) => {
    try {
        const result = await onfleetApi.workers.create(req.body);
        res.send(result.id);
    } catch (err) { 
        console.log(err);
    }
}

const updateDriverDetails = async(req,res) => {
    try {
        const driverId = req.params.driverId;
        const result = await onfleetApi.workers.update(driverId ,req.body);
        res.send(result);
    } catch (err) { 
        console.log(err);
    }
}

const deleteDriverDetails = async(req,res) => {
    try {
        const driverId = req.params.driverId;
        const result = await onfleetApi.workers.deleteOne(driverId);
        res.send(result);
    } catch (err) { 
        console.log(err);
    }
}

module.exports = { getAllDrivers, getDriverById, createDriver, updateDriverDetails, deleteDriverDetails };
