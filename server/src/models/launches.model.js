const launches = new Map();

let latestFlightNumber = 100;

const launch= {
    flightNumber: 100,
    mission: 'Kepler X',
    rocket: 'Explorer 1',
    launchDate: new Date('December 27, 2030'),
    target: 'kepler-442 b',
    customers :['NASA'],
    upcoming:true,
    success: true
}

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId){
    return launches.has(launchId);
}

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch){
    latestFlightNumber++
    launches.set(latestFlightNumber, Object.assign(launch,{
        flightNumber:latestFlightNumber,
        customers:['NASA','Space X'],
        upcoming:true,
        success:true
    }))
}

function abortLaunchbyId(launchId){
const aborted = launches.get(launchId)
aborted.upcoming = false;
aborted.success = false;
return aborted;
}

module.exports={
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchbyId
}