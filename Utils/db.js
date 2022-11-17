import mongoose, { connect } from "mongoose";

const db = ()=>{
    if(mongoose.connections[0].readyState){
        console.log("already connected");
        return;
    }

    mongoose.connect(process.env.MONGODB_URI,{}, err=>{
        if(err) throw err;
        console.log("Connected successfully");
    })
}
export default db;