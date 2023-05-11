import React, { useState } from "react";
import { Grid, Typography, Container, Button, Paper, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { LockOutlined } from "@mui/icons-material";
import Input from "./Input";
import { signin, signup, gsignup, fetchuser } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
  const user = false;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [ShowPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup) {
      dispatch(signup(formData, navigate))
    } else {
      dispatch(signin(formData, navigate))
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const { name, email, picture, sub } = JSON.parse(
      atob(res.credential.split(".")[1])
    );

    const result = { name, email, picture, sub };
    const token = res.credential;
    const user1 = {result, token};

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      
      dispatch(gsignup(result, navigate))
      
      dispatch(fetchuser(user1))

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="376664485964-kdfse7jc4193ou3sagioq95qm4s79lh9.apps.googleusercontent.com">
      <div style={{height: '100vh'}}>
      <Container component="main" maxWidth="xs" >
        <Paper elevation={3} sx={{marginTop: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', borderRadius: '11px'}}>
          <Avatar sx={{margin: '16px'}}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form
            style={{ width: "100%", marginTop: "24px" }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autofocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={ShowPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <div>
              {user ? null : (
                <GoogleLogin
                  render={(renderProps) => (
                    <Button
                      style={{}}
                      color="primary"
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      /*startIcon={<Icon />}*/ variant="contained"
                    >
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={(res) => googleSuccess(res)}
                  onError={() =>
                    console.log(
                      "Google Sign In was unsuccessful. Try Again Later"
                    )
                  }
                  cookiePolicy="single_host_origin"
                  style={{ marginBottom: "16px" }}
                />
              )}
            </div>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Auth;
