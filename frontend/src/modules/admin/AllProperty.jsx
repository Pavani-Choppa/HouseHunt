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
         const response = await axios.get('http://localhost:8001/api/admin/getallproperties', {
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
      <div>
  <TableContainer
    component={Paper}
    sx={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #4e9eff',
      borderRadius: 2,
      boxShadow: '0px 0px 10px rgba(78, 158, 255, 0.2)',
    }}
  >
    <Table sx={{ minWidth: 650 }} aria-label="dark table">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
          <TableCell sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Property ID</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Owner ID</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Property Type</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Property Ad Type</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Property Address</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Owner Contact</TableCell>
          <TableCell align="center" sx={{ color: '#4e9eff', fontWeight: 'bold' }}>Property Amt</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {allProperties.map((property) => (
          <TableRow
            key={property._id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              backgroundColor: '#1e1e1e',
              '&:hover': { backgroundColor: '#2a2a2a' }
            }}
          >
            <TableCell sx={{ color: '#e0e0e0' }}>{property._id}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.ownerId}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyType}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyAdType}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyAddress}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.ownerContact}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>₹{property.propertyAmt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>

   );
};

export default AllProperty;
