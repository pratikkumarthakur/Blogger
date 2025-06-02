import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://pratikthakur:pratikthakur@cluster0.xw6vb5j.mongodb.net/blog-app"
  );
  console.log("DB connected");
};
