import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB);
        console.log(`MongoDB connected successfully`); 
    } catch (error) {
        console.log('Error in database connection',error);
    }
}

export default connectDB;