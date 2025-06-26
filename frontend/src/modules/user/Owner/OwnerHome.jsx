import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddProperty from './AddProperty';
import AllProperties from './AllProperties';
import AllBookings from './AllBookings';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const OwnerHome = () => {
  const user = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return null
  }

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

 const navLinkStyle = {
  color: '#4e9eff',
  textDecoration: 'none',
  fontWeight: 500,
  marginRight: '15px'
};

  return (
    <div>
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

      <Box sx={{ width: '100%' }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#121212', padding: 2, color: '#eee'  }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Add Property" {...a11yProps(0)} />
            <Tab label="All Properties"
              {...a11yProps(1)} />
            <Tab label="All Bookings" {...a11yProps(2)} />
          </Tabs>
        </Box> */}
        <Box
  sx={{
    borderBottom: 1,
    borderColor: '#4e9eff',
    backgroundColor: '#1e1e1e',
    px: 2,
    py: 1,
    borderRadius: '6px 6px 0 0'
  }}
>
  <Tabs
    value={value}
    onChange={handleChange}
    aria-label="dashboard tabs"
    textColor="inherit"
    TabIndicatorProps={{
      style: {
        backgroundColor: '#4e9eff',
        height: '3px',
        borderRadius: '2px'
      }
    }}
  >
    <Tab
      label="Add Property"
      {...a11yProps(0)}
      sx={{
        color: '#ccc',
        fontWeight: 500,
        textTransform: 'none',
        '&.Mui-selected': {
          color: '#4e9eff',
          fontWeight: 'bold'
        }
      }}
    />
    <Tab
      label="All Properties"
      {...a11yProps(1)}
      sx={{
        color: '#ccc',
        fontWeight: 500,
        textTransform: 'none',
        '&.Mui-selected': {
          color: '#4e9eff',
          fontWeight: 'bold'
        }
      }}
    />
    <Tab
      label="All Bookings"
      {...a11yProps(2)}
      sx={{
        color: '#ccc',
        fontWeight: 500,
        textTransform: 'none',
        '&.Mui-selected': {
          color: '#4e9eff',
          fontWeight: 'bold'
        }
      }}
    />
  </Tabs>
</Box>

        <CustomTabPanel value={value} index={0}>
          <AddProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperties />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default OwnerHome

