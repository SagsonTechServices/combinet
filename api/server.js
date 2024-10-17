const express = require('express');
const cors = require('cors');
const {connectToDB} = require('./config/database.config');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const communityRoutes = require('./routes/communtiyRoutes');
const fireBaseRoutes = require('./routes/firebaseRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4500;
app.use(cors({
    origin: process.env.VITE_FRONTEND_URL
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectToDB();

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/cloud', fireBaseRoutes);

app.listen(port , () => {console.log(`Server has started at port number: ${port}`)});