const express = require("express");
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require("./routes/route");

// Configure CORS 
const corsOptions = {
  origin: '*',
  methods: '*', 
  allowedHeaders: ['Content-Type', 'Authorization'],
};

//  helmet to set security headers
app.use(helmet());

//  CORS with the specified options
app.use(cors(corsOptions));

app.use(express.json());

// Initialize DB table
const { createUsersTable } = require("./models/model");
createUsersTable();

// routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
