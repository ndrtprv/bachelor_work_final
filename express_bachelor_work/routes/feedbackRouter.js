const Router = require('express');
const nodemailer = require('nodemailer');
const ApiError = require('../error/ApiError');
const router = new Router();

router.post('/send', async (req, res, next) => {
    const { name, email, topic, text } = req.body;

    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ORIGIN_EMAIL,
                pass: process.env.ORIGIN_PASSWORD
            }
        });

        var mailOptions = {
            from: email,
            to: process.env.ORIGIN_EMAIL,
            subject: name + ', ' + topic,
            text: text
        };
          
        await transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.json({message: 'Помилка надсилання листа за вказаним email!'});
            } else {
                return res.json({status: true, message: 'Лист надіслано за вказаним email. Очікуйте на відповідь.'});
            }
        });
    } catch {
        next(ApiError.badRequest(e.message))
    }
})

module.exports = router;