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
import Button from '@mui/material/Button';

const AllUsers = () => {
   const [allUser, setAllUser] = useState([]);

   useEffect(() => {
      getAllUser();
   }, []);

   const getAllUser = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/admin/getallusers', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });

         if (response.data.success) {
            setAllUser(response.data.data);
         } else {
            message.error(response.data.message);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleStatus = async (userid, status) => {
      try {
         await axios.post('http://localhost:8001/api/admin/handlestatus', { userid, status }, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         }).then((res) => {
            if (res.data.success) {
               getAllUser();
            }
         });
      } catch (error) {
         console.log(error);
      }
   };

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
        <Table sx={{ minWidth: 650 }} aria-label="dark user table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
              {['User ID', 'Name', 'Email', 'Type', 'Granted (for Owners only)', 'Actions'].map((header, idx) => (
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
            {allUser.map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  backgroundColor: '#1e1e1e',
                  '&:hover': { backgroundColor: '#2a2a2a' },
                }}
              >
                <TableCell sx={{ color: '#e0e0e0' }}>{user._id}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{user.name}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{user.email}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{user.type}</TableCell>
                <TableCell align="center" sx={{ color: '#e0e0e0' }}>{user.granted}</TableCell>
                <TableCell align="center">
                  {user.type === 'Owner' && user.granted === 'ungranted' ? (
                    <Button
                      onClick={() => handleStatus(user._id, 'granted')}
                      size="small"
                      variant="outlined"
                      sx={{
                        color: 'green',
                        borderColor: 'green',
                        '&:hover': {
                          backgroundColor: '#4e9eff',
                          color: '#1e1e1e',
                        },
                      }}
                    >
                      Grant
                    </Button>
                  ) : user.type === 'Owner' && user.granted === 'granted' ? (
                    <Button
                      onClick={() => handleStatus(user._id, 'ungranted')}
                      size="small"
                      variant="outlined"
                      sx={{
                        color: '#ff4e4e',
                        borderColor: '#ff4e4e',
                        '&:hover': {
                          backgroundColor: '#ff4e4e',
                          color: '#1e1e1e',
                        },
                      }}
                    >
                      Ungrant
                    </Button>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
   );
};

export default AllUsers;
