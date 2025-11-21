import express from "express";
// import cors from "cors";
import todoModel from "./database/todoModel.js";
import connectDB from "./database/connectDB.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3005;
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI);
app.use(express.json());
app.use(cors({
  origin:"https://eliphaz-mern-todo-list.netlify.app/",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

console.clear();
app.get("/api/findall", async (req, res) => {
  const results = await todoModel.find();
  res.json(results);
});

app.post("/api/addtodo", async (req, res) => {
  try {
    const { task } = req.body;
    const todoitem = new todoModel({ title: task });
    const results = await todoitem.save();
    res.json(results);
    // res.redirect("/api/findall");
  } catch (error) {
    console.log("Todo addition failed");
    res.status(500).json({ error: "Todo addition failed" });
  }
});

app.put("/api/updatetodo", async (req, res) => {
  const { id } = req.body;
  try {
    const todoItem = await todoModel.findById(id);  
    todoItem.isDone = !todoItem.isDone;
    await todoItem.save();
    res.json(todoItem);
  } catch (error) {
    console.log("Todo update failed");
    res.status(500).json({ error: "Todo update failed" });
  }
});

app.delete("/api/deletetodo", async (req, res) => {
  const { _id } = req.body;
  try {
    const results = await todoModel.deleteOne({ _id: _id });
    res.json(results);
  } catch (error) {
    console.log("Deletion Failed");
    console.error(error);
  }
});

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
