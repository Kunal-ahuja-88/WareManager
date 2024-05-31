import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDb connected !! DB : host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDb connection failed !",err);
        process.exit(1);
    }
}

export default connectDb