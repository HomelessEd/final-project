require  ('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require ('./config/db');

connectDB();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ message: "Server is functioning"});
});

app.use('/api/posts', require('./routes/postRoutes'));

app.use((req,res) => {
    res.status(404).json({message: "Route not found"});
});

app.use(( err, req, res, next)=> {
    console.error(err.stack);
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || "Server Error",
            status: status
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server can be found at http://localhost:${PORT}`);
});