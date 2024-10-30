//server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
// app.use('/uploads', express.static('uploads')); 
app.use('/uploads', express.static(path.join(__dirname, 'src/app/uploads')));

// MongoDB Connection
const connectDB = require('./src/app/config/db');

connectDB();


// CORS Middleware
app.use(cors({
    origin: ['http://localhost:3000','https://3pcommunication.com'] // Allow requests from frontend origin only
}));

// Use express built-in JSON parser
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
});

// Import routes
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

// src\app\routes\myContactRoutes.js
// Test route
app.get('/', (req, res) => {
    res.send('Welcome to 3P Communications API!');
});

// Use routes
app.use('/api/users', userRoutes);
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
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes); // Use application routes
app.use('/api/about', aboutRoutes); // Use application routes

app.use('/api/Contact', contactRoutes);
app.use('/api/myContact', myContactRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
