if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }


const http = require('http');

const app =require('./app');
const {mongoConnect} =require ('./services/mongo');

const server = http.createServer(app)

const {loadPlanetsData} = require('./models/planets.model');
const {loadLaunchData} = require('./models/launches.model');



const PORT= process.env.PORT || 8000;
async function startServer(){
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}....`)
})
}

startServer();