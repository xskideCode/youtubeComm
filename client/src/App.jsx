import React from "react";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { GoogleOAuthProvider } from '@react-oauth/google';

import styles from "./style";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Home, Auth, Profile, VideoNav, Channels, ChannelDetail, VideoDetail, HelpCenter, Policies, Terms, Pricing, Checkout} from './components';

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },

      secondary: {
      main: '#f50057',
    },
    companyPurple: {
      main: '#a855f7',
      contrastText: '#fff',
    },
    },
  });
  
  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="bg-primary text-white w-full overflow-hidden">
      <GoogleOAuthProvider clientId="376664485964-kdfse7jc4193ou3sagioq95qm4s79lh9.apps.googleusercontent.com">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={(!user ? <Auth /> : <Navigate replace to="/"/>)} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/videos" element={<VideoNav />} />
            <Route path="/videos/search" element={<VideoNav />} />
            <Route path="/videos/:category" element={<VideoNav />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/terms-and-services" element={<Terms />} />
            {/* <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} /> */}
          </Routes>
        </GoogleOAuthProvider>
      </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
