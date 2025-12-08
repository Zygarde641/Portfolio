const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Stricter rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: { error: 'Too many contact requests. Please try again later.' },
});

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// POST /api/contact
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (name.length > 100) {
      return res.status(400).json({ error: 'Name is too long' });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (subject.length > 200) {
      return res.status(400).json({ error: 'Subject is too long' });
    }

    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long' });
    }

    // Check if email is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email not configured. Contact form submission:');
      console.log({ name, email, subject, message: message.substring(0, 100) + '...' });
      
      // In development, just log and return success
      return res.status(200).json({ 
        success: true, 
        message: 'Message received (email not configured in development)' 
      });
    }

    const transporter = createTransporter();

    // Email to site owner
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d6f06c; background: #0d0d0d; padding: 20px; border-radius: 8px 8px 0 0;">
            New Contact Form Submission
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d6f06c; background: #0d0d0d; padding: 20px; border-radius: 8px 8px 0 0;">
            Thanks for your message!
          </h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br>Arjun Srivastava</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;
