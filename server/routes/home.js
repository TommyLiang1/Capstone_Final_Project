const router = require("express").Router();
const { user } = require("pg/lib/defaults");
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async(req, res) => {
  try {
    //res.json(req.user);
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user]
    );

    res.json(user.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
})

module.exports = router;