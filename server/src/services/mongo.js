const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const MONGO_URL = process.env.MONGO_URI;

mongoose.connection.on('open',()=>{
    console.log('MongoDB connection is Ready')
 })
    
 mongoose.connection.on('error',(err)=>{
    console.error(err)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}
module.exports={
    mongoConnect,
    mongoDisconnect
 }