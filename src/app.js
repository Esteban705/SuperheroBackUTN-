const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

// Middleware
app.use(express.json());



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 