import mongoose from 'mongoose';
export async function connect() {
  try {
    // mongoose.connect(process.env.MONGO_URI!);
    mongoose.connect(process.env.MONGO_URI1!);
    const connection = mongoose.connection;
    connection.on('Connected', () => {
      console.log('MongoDB connected successfully');
    });
  } catch (error) {
    console.log(error);
  }
}
mthdmmg4[odmm];
