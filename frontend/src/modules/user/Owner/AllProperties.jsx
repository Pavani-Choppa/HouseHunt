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
import { Button, Form, Modal, Col, InputGroup, Row, FloatingLabel } from 'react-bootstrap';



const AllProperties = () => {
   const [image, setImage] = useState(null);
   const [editingPropertyId, setEditingPropertyId] = useState(null);
   const [editingPropertyData, setEditingPropertyData] = useState({
      propertyType: '',
      propertyAdType: '',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });
   const [allProperties, setAllProperties] = useState([]);
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      const propertyToEdit = allProperties.find(property => property._id === propertyId);
      if (propertyToEdit) {
         setEditingPropertyId(propertyId);
         setEditingPropertyData(propertyToEdit);
         setShow(true);
      }
   };

   const getAllProperty = async () => {
      try {
         const response = await axios.get('http://localhost:8001/api/owner/getallproperties', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         });
         if (response.data.success) {
            setAllProperties(response.data.data);
         } else {
            message.error('Something went wrong')
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getAllProperty();
   }, []);


   const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
   }
   const handleChange = (e) => {
      const { name, value } = e.target;
      setEditingPropertyData({ ...editingPropertyData, [name]: value });
   }

   useEffect(() => {
      setEditingPropertyData((prevDetails) => ({
         ...prevDetails,
         propertyImage: image,
      }));
   }, [image]);

   const saveChanges = async (propertyId, status) => {
      try {
         const formData = new FormData();
         formData.append('propertyType', editingPropertyData.propertyType);
         formData.append('propertyAdType', editingPropertyData.propertyAdType);
         formData.append('propertyAddress', editingPropertyData.propertyAddress);
         formData.append('ownerContact', editingPropertyData.ownerContact);
         formData.append('propertyAmt', editingPropertyData.propertyAmt);
         formData.append('additionalInfo', editingPropertyData.additionalInfo);
         formData.append('propertyImage', image);
         formData.append('isAvailable', status);
         const res = await axios.patch(`http://localhost:8001/api/owner/updateproperty/${propertyId}`, formData, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
         })
         if (res.data.success) {
            message.success(res.data.message)
            handleClose();
         }
      } catch (error) {
         console.log(error);
         message.error('Failed to save changes');
      }
   };

   const handleDelete = async (propertyId) => {
      let assure = window.confirm("are you sure to delete")
      if (assure) {
         try {
            const response = await axios.delete(`http://localhost:8001/api/owner/deleteproperty/${propertyId}`, {
               headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });

            if (response.data.success) {
               message.success(response.data.message);
               getAllProperty();
            } else {
               message.error(response.data.message);
            }
         } catch (error) {
            console.log(error);
         }
      }

   }


   return (
  <div style={{ backgroundColor: '#1e1e1e', padding: '20px' }}>
  <TableContainer
    component={Paper}
    sx={{
      backgroundColor: '#1e1e1e',
      border: '1px solid #4e9eff',
      borderRadius: '8px',
    }}
  >
    <Table sx={{ minWidth: 650 }} aria-label="dark table">
      <TableHead>
        <TableRow sx={{ backgroundColor: '#2a2a2a' }}>
          {[
            'Property ID',
            'Property Type',
            'Ad Type',
            'Address',
            'Owner Contact',
            'Amount',
            'Availability',
            'Action',
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
        {allProperties.map((property) => (
          <TableRow
            key={property._id}
            sx={{
              backgroundColor: '#1e1e1e',
              '&:hover': { backgroundColor: '#2a2a2a' },
            }}
          >
            <TableCell sx={{ color: '#e0e0e0' }}>{property._id}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyType}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyAdType}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyAddress}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.ownerContact}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.propertyAmt}</TableCell>
            <TableCell align="center" sx={{ color: '#e0e0e0' }}>{property.isAvailable}</TableCell>
            <TableCell align="center">
              <Button
                variant='outlined'
                style={{ borderColor: '#4e9eff', color: '#4e9eff' }}
                onClick={() => handleShow(property._id, 'Available')}
              >
                Edit
              </Button>

              <Modal
                show={show && editingPropertyId === property._id}
                onHide={handleClose}
                centered
              >
                <Modal.Header closeButton style={{ backgroundColor: '#2a2a2a' }}>
                  <Modal.Title style={{ color: '#4e9eff' }}>Edit Property</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#1e1e1e' }}>
                  <Form onSubmit={() => saveChanges(property._id)}>
                    <Row className="mb-3">
                      <Form.Group as={Col} md="4">
                        <Form.Label style={{ color: '#e0e0e0' }}>Property Type</Form.Label>
                        <Form.Select
                          name="propertyType"
                          value={editingPropertyData.propertyType}
                          onChange={handleChange}
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                        >
                          <option value="choose.." disabled>Choose...</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="land/plot">Land/Plot</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} md="4">
                        <Form.Label style={{ color: '#e0e0e0' }}>Ad Type</Form.Label>
                        <Form.Select
                          name="propertyAdType"
                          value={editingPropertyData.propertyAdType}
                          onChange={handleChange}
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                        >
                          <option value="choose.." disabled>Choose...</option>
                          <option value="rent">Rent</option>
                          <option value="sale">Sale</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} md="4">
                        <Form.Label style={{ color: '#e0e0e0' }}>Full Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          name="propertyAddress"
                          value={editingPropertyData.propertyAddress}
                          onChange={handleChange}
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} md="6">
                        <Form.Label style={{ color: '#e0e0e0' }}>Image</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          name="image"
                          onChange={handleImageChange}
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="3">
                        <Form.Label style={{ color: '#e0e0e0' }}>Owner Contact</Form.Label>
                        <Form.Control
                          type="text"
                          name="ownerContact"
                          value={editingPropertyData.ownerContact}
                          onChange={handleChange}
                          required
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                        />
                      </Form.Group>

                      <Form.Group as={Col} md="3">
                        <Form.Label style={{ color: '#e0e0e0' }}>Amount</Form.Label>
                        <Form.Control
                          type="number"
                          name="propertyAmt"
                          value={editingPropertyData.propertyAmt}
                          onChange={handleChange}
                          required
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                        />
                      </Form.Group>

                      <FloatingLabel
                        label="Additional details"
                        className="mt-4"
                      >
                        <Form.Control
                          as="textarea"
                          name="additionalInfo"
                          placeholder="Leave a comment here"
                          value={editingPropertyData.additionalInfo}
                          onChange={handleChange}
                          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0' }}
                        />
                      </FloatingLabel>
                    </Row>

                    <Button
                      type="submit"
                      style={{ float: 'right', borderColor: '#4e9eff', color: '#4e9eff' }}
                      variant="outlined"
                    >
                      Update
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>

              <Button
                className="mx-2"
                variant="outlined"
                style={{ borderColor: 'red', color: 'red' }}
                onClick={() => handleDelete(property._id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>

   );
};

export default AllProperties;

