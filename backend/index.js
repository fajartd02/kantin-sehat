const express = require('express');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config();
const PORT = process.env.PORT;
const app = express();

activatedMiddleware();

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log("Server running at http://localhost:" + PORT);
})

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Database Connected...");
  } catch(err) {
    console.log(err);
  }
}

function activatedMiddleware() {
  app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'http://localhost:4000'] }));
  // app.use(cors({ credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(router);
}