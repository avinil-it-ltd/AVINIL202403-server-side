const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
app.use('/uploads', express.static('uploads')); 

// MongoDB Connection
const connectDB = require('./config/db');

connectDB();
// mongoose.connect(process.env.MONGO_URI || 'your-default-mongo-uri', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => {
//         console.error('MongoDB connection error:', err);
//         process.exit(1); // Exit the process if connection fails
//     });

// CORS Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from frontend origin only
}));

// Use express built-in JSON parser
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware or route handler
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const pageRoutes = require('./routes/pageRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const projectRoutes = require('./routes/projectRoutes'); // Ensure this is correctly defined
const contactRoutes = require('./routes/contactRoutes'); 
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const seoRoutes = require('./routes/seoRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const faqRoutes = require('./routes/faqRoutes');
const careerRoutes = require('./routes/careerRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
// const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');



// Test route
app.get('/', (req, res) => {
    res.send('Welcome to 3P Communications API!');
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/services', serviceRoutes);
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
