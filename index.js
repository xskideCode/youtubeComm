import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session'
import MongoStore from 'connect-mongo'


import userRoutes from './routes/users.js';
import gapiRoutes from './routes/gapi.js';
import channelRoutes from './routes/channels.js';
import videoRoutes from './routes/videos.js';
import promotionRoutes from './routes/promotions.js';

const app = express();

  
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use('/user', userRoutes);
app.use('/auth', gapiRoutes); 
app.use('/channels', channelRoutes); 
app.use('/videos', videoRoutes); 
app.use('/promotions', promotionRoutes); 

app.get('/', (req, res) => {
    res.send('APP IS RUNNING');
})

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

// mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
//     .catch((error) => console.log(error.message));

// Create a new instance of connect-mongo to use as the session store
const mongoStore = MongoStore.create({
    mongoUrl: process.env.CONNECTION_URL,
    collectionName: 'sessions',
  });
  
  mongoose
    .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      // Set up session middleware with connect-mongo as the store
      app.use(
        session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          store: mongoStore,
          cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Session cookie will expire after 1 day
        })
      );
  
      // Start the server
      app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    })
    .catch((error) => console.log(error.message));