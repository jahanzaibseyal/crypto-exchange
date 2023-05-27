import { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { toast } from 'react-toastify';

function Register({ addUser, handleLoginRegisterSwitch }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const validateRegistration = () => {
    const regName = /^[a-zA-Z]+$/;
    const regEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regPassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (firstName.length > 0) {
      if (firstName.length < 3) {
        toast.error('First name is too short!');
        return false;
      }
      if (!regName.test(firstName)) {
        toast.error('First name is Not Valid!');
        return false;
      }
    } else {
      toast.error('First Name is Required!');
      return false;
    }

    if (lastName.length > 0) {
      if (lastName.length < 3) {
        toast.error('Last name is too short!');
        return false;
      }
      if (!regName.test(lastName)) {
        toast.error('Last name is Not Valid!');
        return false;
      }
    } else {
      toast.error('Last Name is Required!');
      return false;
    }

    if (email.length > 0) {
      if (!regEmail.test(email)) {
        toast.error('Invalid Email!');
        return false;
      }
    } else {
      toast.error('Email is Required!');
      return false;
    }
    if (password.length > 0) {
      if (!regPassword.test(password)) {
        toast.error('Invalid Password!');
        toast.info(
          'Password must contain atleast 8 characters with 1 upercase, 1 lowercase, 1 special character and 1 numeric.'
        );
        return false;
      }
    } else {
      toast.error('Password is Required!');
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateRegistration()) {
      addUser({ firstName, lastName, email, password, address });
      toast.info('Registered successfully');
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
          <Paper variant='elevation' elevation={2} className='login-background'>
            <Grid item>
              <Typography component='h1' variant='h5'>
                Register
              </Typography>
            </Grid>
            <Grid item>
              <form>
                <Grid container direction='column' spacing={2}>
                  <Grid item>
                    <TextField
                      label='First Name'
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      variant='filled'
                      autoFocus
                      required
                      autoComplete='fasle'
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label='Last Name'
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      variant='filled'
                      autoComplete='fasle'
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label='Email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      variant='filled'
                      type='email'
                      autoComplete='fasle'
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
                      autoComplete='fasle'
                      required
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label='Address'
                      value={password}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      variant='filled'
                      type='text'
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type='file'
                      accept='application/pdf'
                      variant='filled'
                      InputProps={{
                        style: {
                          width: '100%',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      type='submit'
                      onClick={handleSubmit}
                      variant='contained'
                      className='button-block'
                      color='primary'>
                      Signup
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant='outlined'
                      className='button-block'
                      onClick={() => handleLoginRegisterSwitch()}>
                      Login
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

export default Register;
