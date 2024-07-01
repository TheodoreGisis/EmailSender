const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST /send-email
router.post('/send-email', async (req, res) => {
    const { senderEmail, receiverEmail, message } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // Replace with your email provider
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS 
        }
    });

    // Setup email data
    let mailOptions = {
        from: senderEmail,
        to: receiverEmail,
        subject: 'New Message from ' + senderEmail,
        text: message
    };

    try {
        // Send mail
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email', details: error.message });
    }
});

module.exports = router;
