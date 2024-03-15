const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');

dotenv.config(); // dotenv configuration
const app = express();
app.use(cors()); // Enable CORS

//use for covert all to json (Body parser)
app.use(express.json());

const PORT = process.env.PORT || 3000; 
const connectDb = require('./db'); // Database configuration
connectDb();

const user = require('./controllers/user.controller')
// call the route here
app.use("/api/user", user);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
