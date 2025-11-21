import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  isDone: { type: Boolean, default: false },
});

const todoModel = new mongoose.model("todos", todoSchema)

export default todoModel;