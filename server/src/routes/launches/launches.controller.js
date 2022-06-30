const {getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchbyId} = require('../../models/launches.model');

function httpGetAllLaunches(req,res){
return res.status(200).json(getAllLaunches());
}

function httpAddNewLauch(req,res){
const launch = req.body;

if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
    return res.status(400).json({
        error:'Missing required property',
    })
}

launch.launchDate = new Date(launch.launchDate)

if(isNaN(launch.launchDate)){
    return res.status(400).json({
        error:'Inavlid Launch Date'
    })
}

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunch (req,res){
const launchId = +req.params.id;

if(!existsLaunchWithId(launchId)){
    return res.status(404).json({
        error:'Launch not found'
    })
}
const aborted = abortLaunchbyId(launchId);
return res.status(200).json(aborted);

}
module.exports = {
    httpGetAllLaunches,
    httpAddNewLauch,
    httpAbortLaunch
}