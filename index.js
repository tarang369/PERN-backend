const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//Middleware
app.use(cors());
app.use(express.json()); //=> req.body
//Routes//
//get all todos
app.get("/todos", async (req, res) => {
  try {
    //await
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//create a todo
app.post("/todos", async (req, res) => {
  try {
    //await
    const { description } = req.body;
    console.log(description);
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    //await
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a todo
app.put("/todo/:id", async (req, res) => {
  try {
    //await
    const { id } = req.params;
    const { description } = req.body;
    const todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(`Todo:${id} was updated`);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    //await
    const { id } = req.params;
    const delTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(`Todo:${id} was deleted`);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen((port = 5000), () => {
  console.log(`listening to ${port}`);
});
