const express = require("express");
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require("./routes/route");

// Configure CORS to allow specific origins
const corsOptions = {
  origin: 'https://your-frontend-domain.com', // Replace with your frontend domain
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Apply helmet to set security headers
app.use(helmet());

// Apply CORS with the specified options
app.use(cors(corsOptions));

app.use(express.json());

// Initialize DB table
const { createUsersTable } = require("./models/model");
createUsersTable();

// Use routes
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
