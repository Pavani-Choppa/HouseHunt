import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Form, InputGroup, Row, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { message } from 'antd';

function AddProperty() {
   const [image, setImage] = useState(null);
   const [propertyDetails, setPropertyDetails] = useState({
      propertyType: 'residential',
      propertyAdType: 'rent',
      propertyAddress: '',
      ownerContact: '',
      propertyAmt: 0,
      additionalInfo: ''
   });

   const handleImageChange = (e) => {
      const files = e.target.files;
      setImage(files);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         [name]: value,
      }));
   };

   useEffect(() => {
      setPropertyDetails((prevDetails) => ({
         ...prevDetails,
         propertyImages: image,
      }));
   }, [image]);

   const handleSubmit = (e) => {
      e.preventDefault()
      const formData = new FormData();
      formData.append('propertyType', propertyDetails.propertyType);
      formData.append('propertyAdType', propertyDetails.propertyAdType);
      formData.append('propertyAddress', propertyDetails.propertyAddress);
      formData.append('ownerContact', propertyDetails.ownerContact);
      formData.append('propertyAmt', propertyDetails.propertyAmt);
      formData.append('additionalInfo', propertyDetails.additionalInfo);

      if (image) {
         for (let i = 0; i < image.length; i++) {
            formData.append('propertyImages', image[i]);
         }
      }

      axios.post('http://localhost:8001/api/owner/postproperty', formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
         }
      })
         .then((res) => {
            if (res.data.success) {
               message.success(res.data.message);
            } else {
               message.error(res.data.message);
            }
         })
         .catch((error) => {
            console.error('Error adding property:', error);
         });
   };

   return (
      <Container
  style={{
    backgroundColor: '#1e1e1e',
    border: '1px solid #4e9eff',
    borderRadius: '8px',
    padding: '30px',
    color: '#e0e0e0'
  }}
>
  <Form onSubmit={handleSubmit}>
    <Row className="mb-3">
      <Form.Group as={Col} md="4">
        <Form.Label style={{ color: '#e0e0e0' }}>Property type</Form.Label>
        <Form.Select
          name='propertyType'
          value={propertyDetails.propertyType}
          onChange={handleChange}
          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', border: '1px solid #555' }}
        >
          <option value="choose.." disabled>Choose...</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="land/plot">Land/Plot</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} md="4">
        <Form.Label style={{ color: '#e0e0e0' }}>Property Ad type</Form.Label>
        <Form.Select
          name='propertyAdType'
          value={propertyDetails.propertyAdType}
          onChange={handleChange}
          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', border: '1px solid #555' }}
        >
          <option value="choose.." disabled>Choose...</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} md="4">
        <Form.Label style={{ color: '#e0e0e0' }}>Property Full Address</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Address"
            aria-describedby="inputGroupPrepend"
            required
            name='propertyAddress'
            value={propertyDetails.propertyAddress}
            onChange={handleChange}
            style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', border: '1px solid #555' }}
          />
        </InputGroup>
      </Form.Group>
    </Row>

    <Row className="mb-3">
      <Form.Group as={Col} md="6">
        <Form.Label style={{ color: '#e0e0e0' }}>Property Images</Form.Label>
        <Form.Control
          type="file"
          placeholder="images"
          required
          accept="image/*"
          name="images"
          multiple
          onChange={handleImageChange}
          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', border: '1px solid #555' }}
        />
      </Form.Group>

      <Form.Group as={Col} md="3">
        <Form.Label style={{ color: '#e0e0e0' }}>Owner Contact No.</Form.Label>
        <Form.Control
          type="phone"
          placeholder="Contact number"
          required
          name='ownerContact'
          value={propertyDetails.ownerContact}
          onChange={handleChange}
          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', border: '1px solid #555' }}
        />
      </Form.Group>

      <Form.Group as={Col} md="3">
        <Form.Label style={{ color: '#e0e0e0' }}>Property Amt.</Form.Label>
        <Form.Control
          type="number"
          placeholder="Amount"
          required
          name='propertyAmt'
          value={propertyDetails.propertyAmt}
          onChange={handleChange}
          style={{ backgroundColor: '#2a2a2a', color: '#e0e0e0', border: '1px solid #555' }}
        />
      </Form.Group>
    </Row>

    <FloatingLabel
      label="Additional details for the Property"
      className="mt-4"
      style={{ color: '#e0e0e0' }}
    >
      <Form.Control
        name='additionalInfo'
        value={propertyDetails.additionalInfo}
        onChange={handleChange}
        as="textarea"
        placeholder="Leave a comment here"
        style={{
          backgroundColor: '#2a2a2a',
          color: '#e0e0e0',
          border: '1px solid #555',
          height: '100px'
        }}
      />
    </FloatingLabel>

    <Button
      variant='outline-info'
      className=' mt-3'
      type="submit"
      
    >
      Submit form
    </Button>
  </Form>
</Container>

   );
}


export default AddProperty;
