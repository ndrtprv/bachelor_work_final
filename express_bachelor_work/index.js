require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT;

const app = express();
app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(router);

// Для обробки помилок
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`It's working on port ${PORT}!`));
    } catch (err) {
        console.log(err.message);
    }
}

start();