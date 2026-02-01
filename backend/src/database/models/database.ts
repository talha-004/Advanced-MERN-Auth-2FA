import mongoose, { mongo } from "mongoose";
import { config } from "../../config/app.config";
const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to monogoDB successfuly 👍");
  } catch (error) {
    console.log("Error connecting to mongodb");
    process.exit(1);
  }
};

export default connectDatabase;
