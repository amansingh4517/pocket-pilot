import mongoose from 'mongoose';

// this function will wait for database connection
const connectDB  = async () => {
    try {
        // Connects to your database
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error){
        console.error(`Error:${error.message}`);
        process.exit(1);
    }
};

export default connectDB;