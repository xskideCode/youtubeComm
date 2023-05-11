// Import required packages
import express from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import url from 'url';


// Create a new instance of Express
const app = express();
dotenv.config();
let userCredential = null;

const oauth2Client = new OAuth2Client({
      clientId: /* {'376664485964-kdfse7jc4193ou3sagioq95qm4s79lh9.apps.googleusercontent.com',} */ process.env.CLIENT_ID ,
      clientSecret: /* {'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', } */ process.env.CLIENT_SECRET,
      redirectUri: 'http://localhost:5000/auth/google/callback', // the redirect URI for your app
});
    
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/youtube.readonly'],
  include_granted_scopes: 'true',
});

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const oauthClient = new google.auth.OAuth2(clientID,clientSecret,'postmessage');

export const gapi = async (req, res) => {

  try {
    res.writeHead(301, { "Location": authUrl });
    res.end();

  } catch (error) {
      console.error(error);
      res.status(500).send('Error Authenticating.');
  }
}

export const youtube = async (req, res) => {

  const { code } = req.body;


  try {

    // const q = url.parse(req.url, true).query;    
        
    // if (q.error) { // An error response e.g. error=access_denied
    //   console.log('Error:' + q.error);
    //   res.send('Error:' + q.error);
    // } else { // Get access and refresh tokens (if access_type is offline)

      const { tokens } = await oauthClient.getToken(code);
      

      // set the access token and refresh token on the OAuth2 client
      oauthClient.setCredentials(tokens);

      /** Save credential to the global variable in case access token was refreshed.
       * ACTION ITEM: In a production app, you likely want to save the refresh token
       *              in a secure persistent database instead. */
      userCredential = tokens;

      // create the YouTube API client
      const youtube = google.youtube({
        version: 'v3',
        auth: oauthClient,
      });

      // get the authenticated user's YouTube channel data and log it to the console
      const { data } = await youtube.channels.list({
        part: 'snippet,topicDetails,statistics',
        mine: true,
      });

      res.status(200).json(data);
      
    //}

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving YouTube channel data.');
  }
}

export const videos = async (req, res) => {

  const { code } = req.body;
  const { videoId } = req.params;

  try {
      //const q = url.parse(req.url, true).query;    
        
    // if (q.error) { // An error response e.g. error=access_denied
    //   console.log('Error:' + q.error);
    //   res.send('Error:' + q.error);
    // } else { // Get access and refresh tokens (if access_type is offline)

       const { tokens } = await oauthClient.getToken(code);      

      // // set the access token and refresh token on the OAuth2 client
       oauthClient.setCredentials(tokens);

      // /** Save credential to the global variable in case access token was refreshed.
      //  * ACTION ITEM: In a production app, you likely want to save the refresh token
      //  *              in a secure persistent database instead. */
       userCredential = tokens;

      // create the YouTube API client
      const youtube = google.youtube({
        version: 'v3',
        auth: oauthClient,
      });

      // get the authenticated user's YouTube channel data and log it to the console
      const { data } = await youtube.videos.list({
        part: 'snippet,topicDetails,statistics',
        id: videoId,
      });

      res.status(200).json(data);
      
    //}

  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving YouTube channel data.');
  }
}

export const posttoken = async (req, res) => {

  try {
    const { authcode } = req.body;
    const { code } = authcode

    const response = await fetch({
      method: 'post',
      url: 'https://oauth2.googleapis.com/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      params: {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: 'http://localhost:5000/auth/google/callback',
        grant_type: 'authorization_code',
      },
    });

    const { access_token } = response.data;

    res.status(200).json({ access_token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error exchanging code for token');
  }
}

import session from 'express-session';


app.use(express.json());
app.use(session({
  secret: 'YOUR_SESSION_SECRET',
  resave: false,
  saveUninitialized: true,
}));

const clientId = process.env.CLIENT_ID;
const clientfSecret = process.env.CLIENT_SECRET;
const redirectUri = 'http://localhost:5173/profile/callback';
const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

// Create the Google OAuth 2.0 client
const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

// Create an endpoint to exchange the authorization code for an access token
export const token =  async (req, res) => {
  const { authorizationCode } = req.body;

  try {
    // Exchange the authorization code for an access token and refresh token
    const { tokens } = await oAuth2Client.getToken(authorizationCode);
    oAuth2Client.setCredentials(tokens);

    // Store the access token and refresh token in the user's session
    req.session.tokens = tokens;

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

// Create an endpoint to make API requests to Google on behalf of the user
// app.get('/api/calendar', async (req, res) => {
//   try {
//     // Get the access token and refresh token from the user's session
//     const { tokens } = req.session;
//     oAuth2Client.setCredentials(tokens);

//     // Use the access token to authenticate the API request to Google
//     const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
//     const response = await calendar.events.list({
//       calendarId: 'primary',
//       timeMin: (new Date()).toISOString(),
//       maxResults: 10,
//       singleEvents: true,
//       orderBy: 'startTime',
//     });

//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.sendStatus(500);
//   }
// });

