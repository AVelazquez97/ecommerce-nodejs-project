import mongoose from 'mongoose';
import { MONGO_URL } from '../config/index.js';

let instanceMongoDB = null;

class MongoDBConnection {
  constructor() {
    this.msjConnect();
    this.msjError();
  }

  connect = async () => {
    const connection = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return connection;
  };

  msjConnect = () => {
    mongoose.connection.on('connected', () => {
      console.log(`[Mongoose(MongoBD)] - Conectada`);
    });
    return false;
  };

  msjError = () => {
    mongoose.connection.on('error', (err) => {
      console.log('[Mongoose(MongoBD)] - Error:', err.message);
    });
    return false;
  };

  static getMongoDBInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new MongoDBConnection(MONGO_URL);
    }
    return instanceMongoDB;
  };
}

export { MongoDBConnection };