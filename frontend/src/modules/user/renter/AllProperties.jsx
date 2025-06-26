import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const AllProperty = () => {
   const [allProperties, setAllProperties] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get(`http://localhost:8001/api/user/getallbookings`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);

   return (
      <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
  <TableContainer
    component={Paper}
    sx={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #4e9eff',
      borderRadius: '8px',
    }}
  >
    <Table sx={{ minWidth: 650 }} aria-label="dark themed booking table">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
          <TableCell sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Booking ID</TableCell>
          <TableCell sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Property ID</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Tenant Name</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Phone</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Booking Status</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {allProperties.map((booking) => (
          <TableRow
            key={booking._id}
            sx={{
              backgroundColor: '#1e1e1e',
              '&:hover': { backgroundColor: '#2a2a2a' },
            }}
          >
            <TableCell sx={{ color: '#e0e0e0' }}>{booking._id}</TableCell>
            <TableCell sx={{ color: '#e0e0e0' }}>{booking.propertyId}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.userName}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.phone}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.bookingStatus}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>

   );
};

export default AllProperty;

