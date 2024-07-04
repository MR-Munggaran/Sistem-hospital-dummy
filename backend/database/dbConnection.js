import mongoose from "mongoose";

export const dbConnection= () => {
    mongoose.connect(process.env.MONGOURL).then(()=> {
        console.log("Database is Connected")
    }).catch(err => {
        console.log(`Some error occured while connecting to database: ${err}`)
    })
}