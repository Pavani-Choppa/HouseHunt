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

const AllBookings = () => {
   const [allBookings, setAllBookings] = useState([]);

   const getAllBooking = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallbookings', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllBookings(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllBooking();
   }, []);

   return (
      <div style={{ padding: '20px', backgroundColor: '#1e1e1e', minHeight: '100vh' }}>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(78, 158, 255, 0.1)',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="dark booking table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
              {[
                'Booking ID',
                'Owner ID',
                'Property ID',
                'Tenant ID',
                'Tenant Name',
                'Tenant Contact',
                'Booking Status',
              ].map((header, idx) => (
                <TableCell
                  key={idx}
                  align={idx === 0 ? 'left' : 'center'}
                  sx={{
                    color: '#4e9eff',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #4e9eff',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allBookings.map((booking) => (
              <TableRow
                key={booking._id}
                sx={{
                  backgroundColor: '#1e1e1e',
                  '&:hover': { backgroundColor: '#2a2a2a' },
                }}
              >
                <TableCell sx={{ color: '#e0e0e0' }}>{booking._id}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.ownerID}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.propertyId}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.userID}</TableCell>
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

export default AllBookings;
