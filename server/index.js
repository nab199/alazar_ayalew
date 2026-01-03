/* Simple contact API server for development
 * Requirements (set in environment):
 * SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '500kb' }));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic email validation
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // Create nodemailer transport using environment SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined,
  });

  const to = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@alazarpro.com';

  try {
    await transporter.sendMail({
      from: `${name} <${from}>`,
      to,
      subject: `Website Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('Email send error', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

// --- AI proxy endpoint (server-side) ---
// Receives { message } and forwards to Google Gemini using server-side API key.
// Includes a lightweight per-IP rate limiter to prevent abuse.
const { GoogleGenAI } = require('@google/genai');
const aiRateMap = new Map(); // ip -> { count, ts }
const AI_WINDOW_MS = 60_000; // 1 minute
const AI_MAX_PER_WINDOW = 10;

app.post('/api/ai-chat', async (req, res) => {
  const { message } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const entry = aiRateMap.get(ip) || { count: 0, ts: now };
  if (now - entry.ts > AI_WINDOW_MS) {
    entry.count = 0;
    entry.ts = now;
  }
  entry.count++;
  aiRateMap.set(ip, entry);

  if (entry.count > AI_MAX_PER_WINDOW) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  if (!process.env.API_KEY) {
    console.error('API_KEY not set for AI proxy');
    return res.status(500).json({ error: 'AI not configured' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are the Alazar Pro Assistant. Be helpful and concise."
      }
    });

    const response = await chat.sendMessage({ message });
    return res.json({ text: response?.text || '' });
  } catch (err) {
    console.error('AI request failed', err);
    return res.status(500).json({ error: 'AI request failed' });
  }
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Contact API listening on port ${PORT}`);
  });
}

module.exports = app;