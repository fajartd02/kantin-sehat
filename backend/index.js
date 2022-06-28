const express = require('express');
const { sequelize } = require('./models');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const PORT = 5000;
const app = express();

// Middleware
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, async () => {
  console.log("Server running at http://localhost:" + PORT);
  // await sequelize.sync({ force: true })
  // console.log("Database Syncronize!");
})