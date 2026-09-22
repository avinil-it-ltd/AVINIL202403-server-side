//server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env and config.env
dotenv.config();
dotenv.config({ path: path.join(__dirname, 'src/app/config/config.env') });

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
// app.use('/uploads', express.static('uploads')); 
app.use('/uploads', express.static(path.join(__dirname, 'src/app/uploads')));

// MongoDB Connection
const connectDB = require('./src/app/config/db');

// Connect to DB
connectDB();

// Allowed origins configuration
const defaultAllowedOrigins = [
    'https://3pcommunication.com',
    'http://3pcommunication.com',
    'https://www.3pcommunication.com',
    'http://www.3pcommunication.com',
    'http://localhost:3000',
    'http://localhost:5173',
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()) 
    : [];

const allowedOrigins = Array.from(new Set([...defaultAllowedOrigins, ...envAllowedOrigins]));

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);

        // Check exact match or subdomains of 3pcommunication.com
        const isAllowed = allowedOrigins.includes(origin) || 
            /^https?:\/\/([a-z0-9-]+\.)*3pcommunication\.com$/i.test(origin);

        if (isAllowed) {
            callback(null, true);
        } else {
            console.log(`CORS request from origin: ${origin}`);
            callback(null, true); // Permissive fallback to prevent unexpected blocking
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
};

// CORS Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Fallback headers middleware ensuring CORS headers are always attached (even on errors)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

// Use express built-in JSON parser
app.use(express.json());

// Database connection check middleware for requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error in request:', error);
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
});

// Import routes

const headlineRoutes = require('./src/app/routes/headlineRoutes');


const userRoutes = require('./src/app/routes/authRoutes');
const pageRoutes = require('./src/app/routes/pageRoutes');
const serviceRoutes = require('./src/app/routes/serviceRoutes');
const categoryRoutes = require('./src/app/routes/categoryRoutes');
const projectRoutes = require('./src/app/routes/projectRoutes'); // Ensure this is correctly defined
const contactRoutes = require('./src/app/routes/contactRoutes'); 
const blogRoutes = require('./src/app/routes/blogRoutes');
const testimonialRoutes = require('./src/app/routes/testimonialRoutes');
const mediaRoutes = require('./src/app/routes/mediaRoutes');
const galleryRoutes = require('./src/app/routes/galleryRoutes');
const seoRoutes = require('./src/app/routes/seoRoutes');
const settingsRoutes = require('./src/app/routes/settingsRoutes');
const subscriberRoutes = require('./src/app/routes/subscriberRoutes');
const faqRoutes = require('./src/app/routes/faqRoutes');
const careerRoutes = require('./src/app/routes/careerRoutes');
const applicationRoutes = require('./src/app/routes/applicationRoutes');
// const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./src/app/routes/authRoutes');
const aboutRoutes = require('./src/app/routes/aboutRoutes');
const myContactRoutes = require('./src/app/routes/myContactRoutes');
const policyRoutes = require('./src/app/routes/policyRoutes');


// src\app\routes\myContactRoutes.js
// Test route
app.get('/', (req, res) => {
    res.send('Welcome to 3P Communications API!');
});

// Use routes
app.use('/api/auth', userRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/projects', projectRoutes); 
app.use('/api/contacts', contactRoutes); 
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes); // Use application routes
app.use('/api/about', aboutRoutes); // Use application routes
// Use policy routes
app.use('/api/policies', policyRoutes);
app.use('/api/Contact', contactRoutes);
app.use('/api/myContact', myContactRoutes);
app.use('/api/headlines', headlineRoutes);


// Global error handler with guaranteed CORS headers
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    const origin = req.headers.origin;
    if (origin) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? {} : err
    });
});

// Start the server (if run directly or non-Vercel environment)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the Express app for Vercel Serverless Functions
module.exports = app;

