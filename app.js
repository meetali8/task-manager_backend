const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors'); 

const app = express();

// Enable CORS for all routes and origins
app.use(cors()); 

app.use(express.json());

app.use('/api', taskRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
