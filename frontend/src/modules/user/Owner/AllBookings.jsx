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
import { Button } from 'react-bootstrap';

const AllProperty = () => {
   const [allBookings, setAllBookings] = useState([]);

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallbookings', {
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
      getAllProperty();
   }, []);

   const handleStatus = async (bookingId, propertyId, status) => {
      try {
         const res = await axios.post('http://localhost:8001/api/owner/handlebookingstatus', { bookingId, propertyId, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message)
            getAllProperty()
         }
         else {
            message.error('Something went wrong')
         }
      } catch (error) {
         console.log(error);
      }
   }

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
    <Table sx={{ minWidth: 650 }} aria-label="booking table">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
          {[
            'Booking ID',
            'Property ID',
            'Tenant Name',
            'Tenant Phone',
            'Booking Status',
            'Actions'
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
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.propertyId}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.userName}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.phone}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{booking.bookingStatus}</TableCell>
            <TableCell align="center">
              {booking.bookingStatus === 'pending' ? (
                <Button
                  onClick={() => handleStatus(booking._id, booking.propertyId, 'booked')}
                  variant="outlined"
                  style={{ borderColor: '#28a745', color: '#28a745' }}
                  size="small"
                >
                  Change
                </Button>
              ) : (
                <Button
                  onClick={() => handleStatus(booking._id, booking.propertyId, 'pending')}
                  variant="outlined"
                  style={{ borderColor: '#dc3545', color: '#dc3545' }}
                  size="small"
                >
                  Change
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>

   );
};

export default AllProperty;

