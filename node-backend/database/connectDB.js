import mongoose from 'mongoose'

const connectDB = async (dbURL) => {
    try{
        await mongoose.connect(dbURL)
        console.log('connected to database...')
    }catch(err) {
        console.log('database connection failed...')
    }
}
export default connectDB;