const express = require('express');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());

const PORT = 5000;

app.get("/", async(req, res) => {
  res.send({message: "anjay"})
})

app.listen(PORT, async () => {
  console.log("Server running at http://localhost:" + PORT);
  // await sequelize.sync({ force: true })
  // console.log("Database Syncronize!");
})