require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const bcrypt = require('bcrypt');
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
app.options('*', cors());
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

        var encryptPassword = await bcrypt.hash(process.env.ORIGIN_PASSWORD_ACC, 7);

        const [user1, created1] = await models.User.findOrCreate({
            where: {login: process.env.ORIGIN_EMAIL},
            defaults: {
                login: process.env.ORIGIN_EMAIL,
                phone_num: "+380668202537",
                password: encryptPassword,
                name: "Андрій",
                surname: "Топоров",
                bio: "",
                hideData: false,
                createdAt: new Date(),
                verifiedAt: new Date()
            }
        });

        if(created1){
            console.log('Створено користувача. ', user1);
        }

        await models.Admin.findOrCreate({
            where: {user_id: user1.id},
            defaults: {
                status: 1,
                role: "Голова благодійного фонду.",
                user_id: user1.id
            }
        }).then((adminRow, isCreated) => {
            if(isCreated){
                console.log('Створено адміністратора. ', adminRow);
            }
        });

        encryptPassword = await bcrypt.hash(process.env.ADMIN_1_PASSWORD, 7);

        const [user2, created2] = await models.User.findOrCreate({
            where: {login: process.env.ADMIN_1_EMAIL},
            defaults: {
                login: process.env.ADMIN_1_EMAIL,
                phone_num: "+380957002455",
                password: encryptPassword,
                name: "Валерій",
                surname: "Грищук",
                bio: "",
                hideData: false,
                createdAt: new Date(),
                verifiedAt: new Date()
            }
        });

        if(created2){
            console.log('Створено користувача. ', user2);
        }

        await models.Admin.findOrCreate({
            where: {user_id: user2.id},
            defaults: {
                status: 1,
                role: "Перший заступник голови.",
                user_id: user2.id
            }
        }).then((adminRow, isCreated) => {
            if(isCreated){
                console.log('Створено адміністратора. ', adminRow);
            }
        });

        encryptPassword = await bcrypt.hash(process.env.ADMIN_2_PASSWORD, 7);

        const [user3, created3] = await models.User.findOrCreate({
            where: {login: process.env.ADMIN_2_EMAIL},
            defaults: {
                login: process.env.ADMIN_2_EMAIL,
                phone_num: "+380502502188",
                password: encryptPassword,
                name: "Павло",
                surname: "Пилипчук",
                bio: "",
                hideData: false,
                createdAt: new Date(),
                verifiedAt: new Date()
            }
        });

        if(created3){
            console.log('Створено користувача. ', user3);
        }

        await models.Admin.findOrCreate({
            where: {user_id: user3.id},
            defaults: {
                status: 1,
                role: "Заступник голови.",
                user_id: user3.id
            }
        }).then((adminRow, isCreated) => {
            if(isCreated){
                console.log('Створено адміністратора. ', adminRow);
            }
        });
    } catch (err) {
        console.log(err.message);
    }
}

start();