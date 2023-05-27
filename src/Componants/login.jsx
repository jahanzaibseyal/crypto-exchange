import { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';
import './login.css';

function Login({ handleLogin, handleLoginRegisterSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => {
    if (email.length === 0) {
      toast.error('Please enter your email!');
      return false;
    }
    if (password.length === 0) {
      toast.error('Please enter your password!');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      handleLogin({ email, password });
    }
  };

  return (
    <Grid container spacing={3} justify='center' direction='row'>
      <Grid item>
        <Grid
          container
          direction='column'
          justify='center'
          spacing={2}
          className='login-form'>
          <Paper
            variant='elevation'
            //   elevation={2}
            className='login-background'>
            <Grid item>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
            </Grid>
            <Grid item>
              <form>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <TextField
                      label='Email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      variant='filled'
                      type='email'
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label='Password'
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      variant='filled'
                      type='password'
                      required
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type='submit'
                      onClick={handleSubmit}
                      variant='contained'
                      className='button-block'
                      color='primary'>
                      Login
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='outlined'
                      className='button-block'
                      onClick={() => handleLoginRegisterSwitch()}>
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
