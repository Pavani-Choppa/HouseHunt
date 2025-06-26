import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import { message } from 'antd';
const Register = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!data?.name || !data?.email || !data?.password||! data?.type ) return alert("Please fill all fields");
    else {
      axios.post('http://localhost:8001/api/user/register', data)
        .then((response) => {
          if (response.data.success) {
            message.success(response.data.message);
            navigate('/login')

          } else {
            message.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };
  
  const navLinkStyle = {
  color: '#4e9eff',
  textDecoration: 'none',
  fontWeight: 500,
  marginRight: '15px'
};

  return (
    <>
       <Navbar expand="lg" style={{ backgroundColor: '#1e1e1e' }}>
  <Container fluid>
    <Navbar.Brand>
      <Link to="/" style={{ 
        color: '#4e9eff', 
        fontWeight: 'bold', 
        fontSize: '24px', 
        textDecoration: 'none' 
      }}>
        HOUSEHUNT
      </Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: '#2a2a2a' }} />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />

      <Nav>
        <Link to={"/"} style={navLinkStyle}>Home</Link>
        <Link to={"/login"} style={navLinkStyle}>Login</Link>
        <Link to={"/register"} style={navLinkStyle}>Register</Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      <Container component="main" >
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Renter Full Name/Owner Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="name"
              autoFocus
            /> */}
            <TextField
  margin="normal"
  fullWidth
  id="name"
  label="Renter Full Name / Owner Name"
  name="name"
  value={data.name}
  onChange={handleChange}
  autoComplete="name"
  autoFocus
  variant="outlined"
  InputProps={{
    style: {
      backgroundColor: '#1e1e1e',
      color: '#f5f5f5',
    }
  }}
  InputLabelProps={{
    style: { color: '#b0b0b0' }
  }}
/>

<TextField
  margin="normal"
  fullWidth
  id="email"
  label="Email Address"
  name="email"
  value={data.email}
  onChange={handleChange}
  autoComplete="email"
  InputProps={{
    style: {
      backgroundColor: '#1e1e1e',
      color: '#f5f5f5',
    }
  }}
  InputLabelProps={{
    style: { color: '#b0b0b0' }
  }}
/>

<TextField
  margin="normal"
  fullWidth
  name="password"
  label="Password"
  type="password"
  id="password"
  value={data.password}
  onChange={handleChange}
  autoComplete="current-password"
  InputProps={{
    style: {
      backgroundColor: '#1e1e1e',
      color: '#f5f5f5',
    }
  }}
  InputLabelProps={{
    style: { color: '#b0b0b0' }
  }}
/>

<InputLabel 
  id="user-type-label" 
  style={{ color: '#b0b0b0', marginTop: '10px' }}
>
  User Type
</InputLabel>

<Select
  labelId="user-type-label"
  id="user-type"
  name='type'
  value={data.type}
  onChange={handleChange}
  fullWidth
  style={{ 
    backgroundColor: '#1e1e1e',
    color: '#f5f5f5',
    marginTop: '5px'
  }}
>
  <MenuItem value={'Select User'} disabled>Select User</MenuItem>
  <MenuItem value={'Renter'}>Renter</MenuItem>
  <MenuItem value={'Owner'}>Owner</MenuItem>
</Select>

<Box mt={2}>
  <Button
    type="submit"
    variant="contained"
    style={{
      width: '200px',
      backgroundColor: '#4e9eff',
      color: '#ffffff',
      fontWeight: 600
    }}
  >
    Sign Up
  </Button>
</Box>

            <Grid container>
              <Grid item>Have an account?
                <Link style={{ color: "blue" }} to={'/login'} variant="body2">
                  {" Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default Register
