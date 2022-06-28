const express = require('express');
const { sequelize } = require('./models');
const router = require('./routes');

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, async () => {
  console.log("Server running at http://localhost:" + PORT);
  // await sequelize.sync({ force: true })
  // console.log("Database Syncronize!");
})