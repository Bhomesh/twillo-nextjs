import mongoose from 'mongoose';

export async function connect() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on('Connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running. ' + err
      );
      process.exit();
    });
  } catch (error) {
    console.log('MongoDB connection error');
    console.log(error);
  }
}
