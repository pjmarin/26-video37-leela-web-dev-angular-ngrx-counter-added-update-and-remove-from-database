import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB_URI);
  console.log("😎😎 db conectada 👌");
} catch (error) {
  console.log("😒😒" + error);
}