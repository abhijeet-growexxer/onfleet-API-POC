const { onfleetApi } = require('../config/config');

const getAllTeams = async(req,res) => {
    try {
        const teams = await onfleetApi.teams.get();
        res.send(teams);
    } catch (err) { 
        console.log(err);
    }
}

const getSingleTeam = async(req,res) => {
    try {
        const teamId = req.params.id;
        const team = await onfleetApi.teams.get(teamId);
        res.send(team);
    } catch (err) { 
        console.log(err);
    }
}

const createTeam = async(req,res) => {
    try {
        const result = await onfleetApi.teams.create(req.body);
        res.send(result.id);
    } catch (err) { 
        console.log(err);
    }
}

const updateTeam = async(req,res) => {
    try {
        const teamId = req.params.id;
        const result = await onfleetApi.teams.update(teamId ,req.body);
        res.send(result);
    } catch (err) { 
        console.log(err);
    }
}

const deleteTeam = async(req,res) => {
    try {
        const teamId = req.params.id;
        const result = await onfleetApi.teams.update(teamId ,req.body);
        res.send(result);
    } catch (err) { 
        console.log(err);
    }
}

module.exports = { getAllTeams, getSingleTeam, createTeam, updateTeam, deleteTeam };
