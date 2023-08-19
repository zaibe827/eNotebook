const mongoose=require('mongoose');

const mongoURI='mongodb://0.0.0.0:27017/';
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected To Mongo");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports=connectToMongo;