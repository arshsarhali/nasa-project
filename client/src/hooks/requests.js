const API_URL = 'http://localhost:8000';

async function httpGetPlanets() {
 const response = await fetch(`${API_URL}/planets`)
 return await response.json();
}

async function httpGetLaunches() {
 
}

async function httpSubmitLaunch(launch) {
 
}

async function httpAbortLaunch(id) {
 
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};