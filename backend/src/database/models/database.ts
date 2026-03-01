import mongoose, { mongo } from "mongoose";
import { config } from "../../config/app.config";
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    const { host, port, name } = mongoose.connection;
    console.log(
      `👍 Connected to MongoDB successfully  - Host: ${host} - Database: ${name}`,
    );
  } catch (error) {
    console.log("Error connecting to mongodb");
    process.exit(1);
  }
};

export default connectDatabase;
