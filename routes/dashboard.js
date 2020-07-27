const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

//get user
router.get("/", authorization, async (req, res) => {
  try {
    //await
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//search todos
router.get("/todo", authorization, async (req, res) => {
  try {
    const { q } = req.query;
    //await
    const search = await pool.query(
      "SELECT * FROM todo WHERE description ILIKE $1",
      [`%${q}%`]
    );
    res.json(search.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get all todos
router.get("/todos", authorization, async (req, res) => {
  try {
    //await
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//create a todo
router.post("/todos", authorization, async (req, res) => {
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
router.get("/todo/:id", authorization, async (req, res) => {
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
router.put("/todo/:id", authorization, async (req, res) => {
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
router.delete("/todo/:id", authorization, async (req, res) => {
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

module.exports = router;
