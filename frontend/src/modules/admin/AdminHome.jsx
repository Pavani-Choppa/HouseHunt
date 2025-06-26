import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { UserContext } from '../../App';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AllUsers from './AllUsers';
import AllProperty from './AllProperty';
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
const AdminHome = () => {
  const user = useContext(UserContext)
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (!user) {
    return null;;
  }

  return (
    <div>
   <Navbar expand="lg" style={{ backgroundColor: '#1e1e1e' }}>
  <Container fluid>
    <Navbar.Brand>
      <h2 style={{ color: '#4e9eff', fontWeight: 600 }}>HOUSEHUNT</h2>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" style={{ backgroundColor: '#2a2a2a' }} />
    <Navbar.Collapse id="navbarScroll">
      <Nav className="me-auto" />
      <Nav className="d-flex align-items-center">
        <h5 style={{ color: '#f5f5f5' }} className="mx-3">Hi {user.userData.name}</h5>
        <Link
          onClick={handleLogOut}
          to="/"
          style={{
            color: '#4e9eff',
            backgroundColor: 'transparent',
            padding: '8px 12px',
            borderRadius: '6px',
            textDecoration: 'none',
            transition: '0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#ffb86c'}
          onMouseLeave={(e) => e.target.style.color = '#4e9eff'}
        >
          Log Out
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

      <Box sx={{ width: '100%' }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All Users" {...a11yProps(0)} />
            <Tab label="All Properties" {...a11yProps(1)} />
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
    aria-label="admin-tabs"
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
      label="All Users"
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
          <AllUsers />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllProperty />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <AllBookings />
        </CustomTabPanel>
      </Box>
    </div>
  )
}

export default AdminHome
