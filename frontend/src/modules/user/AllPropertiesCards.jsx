import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, Carousel, Col, Form, InputGroup, Row } from 'react-bootstrap';
// import { Col, Form, Input, Row, message } from 'antd';
import { Link } from 'react-router-dom';
import { message } from 'antd';

const AllPropertiesCards = ({ loggedIn }) => {
   const [index, setIndex] = useState(0);
   const [show, setShow] = useState(false);
   const [allProperties, setAllProperties] = useState([]);
   const [filterPropertyType, setPropertyType] = useState('');
   const [filterPropertyAdType, setPropertyAdType] = useState('');
   const [filterPropertyAddress, setPropertyAddress] = useState('');
   const [propertyOpen, setPropertyOpen] = useState(null)
   const [userDetails, setUserDetails] = useState({
      fullName: '',
      phone: 0,
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserDetails({ ...userDetails, [name]: value });
   };

   const handleClose = () => setShow(false);

   const handleShow = (propertyId) => {
      setPropertyOpen(propertyId)
      setShow(true)
   };

   const getAllProperties = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/user/getAllProperties');
         setAllProperties(res.data.data);
      } catch (error) {
         console.log(error);
      }
   };

   const handleBooking = async (status, propertyId, ownerId) => {
      try {
         await axios.post(`http://localhost:8001/api/user/bookinghandle/${propertyId}`, { userDetails, status, ownerId }, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`
            }
         })
            .then((res) => {
               if (res.data.success) {
                  message.success(res.data.message)
                  handleClose()
               }
               else {
                  message.error(res.data.message)
               }
            })
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      getAllProperties();
   }, []);



   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };

   const filteredProperties = allProperties
      .filter((property) => filterPropertyAddress === '' || property.propertyAddress.includes(filterPropertyAddress))
      .filter(
         (property) =>
            filterPropertyAdType === '' ||
            property.propertyAdType.toLowerCase().includes(filterPropertyAdType.toLowerCase())
      )
      .filter(
         (property) =>
            filterPropertyType === '' ||
            property.propertyType.toLowerCase().includes(filterPropertyType.toLowerCase())
      );

   return (
      <>
         <div className=" mt-4 filter-container text-center">
            <p className="mt-3">Filter By: </p>
            <input
               type="text"
               placeholder=": Address"
               value={filterPropertyAddress}
               onChange={(e) => setPropertyAddress(e.target.value)}
            />
            <select value={filterPropertyAdType} onChange={(e) => setPropertyAdType(e.target.value)}>
               <option value="">All Ad Types</option>
               <option value="sale">Sale</option>
               <option value="rent">Rent</option>
            </select>
            <select value={filterPropertyType} onChange={(e) => setPropertyType(e.target.value)}>
               <option value="">All Types</option>
               <option value="commercial">Commercial</option>
               <option value="land/plot">land/Plot</option>
               <option value="residential">Residential</option>
            </select>
         </div>
         <div className="d-flex column mt-5">
            {filteredProperties && filteredProperties.length > 0 ? (
               filteredProperties.map((property) => (
                  <Card border="dark" key={property._id} style={{ width: '18rem', marginLeft: 10 }}>
                     <Card.Body>
                        <Card.Title><img src={`http://localhost:8001${property.propertyImage[0].path}`} alt='photos' /></Card.Title>
                        <Card.Text>
                           <p style={{ fontWeight: 600 }} className='my-1'>Location:</p> {property.propertyAddress} <br />
                           <p style={{ fontWeight: 600 }} className='my-1'>Property Type:</p> {property.propertyType} <br />
                           <p style={{ fontWeight: 600 }} className='my-1'>Ad Type:</p> {property.propertyAdType} <br />
                           {!loggedIn ? (
                              <>
                              </>
                           ) : (
                              <>
                                 <p style={{ fontWeight: 600 }} className='my-1'>Owner Contact:</p> {property.ownerContact} <br />
                                 <p style={{ fontWeight: 600 }} className='my-1'>Availabilty:</p> {property.isAvailable} <br />
                                 <p style={{ fontWeight: 600 }} className='my-1'>Property Amount:</p> Rs.{property.propertyAmt}<br />
                              </>
                           )}
                        </Card.Text>
                        {
                           !loggedIn ? (<>
                              <p style={{ fontSize: 12, color: 'orange', marginTop: 20 }}>For more details, click on get info</p>
                              <Link to={'/login'}>
                                 <Button style={{ float: 'left', backgroundColor: '#4e9eff',      // accent blue
                                                color: '#ffffff',                // white text
                                                border: 'none',
                                                fontWeight: '500',
                                                padding: '6px 16px',
                                                borderRadius: '6px'}} variant="outline-dark">
                                    Get Info
                                 </Button>
                              </Link></>
                           ) : (
                              <div>
                                 {
                                    property.isAvailable === "Available" ? <><p style={{ float: 'left', fontSize: 12, color: 'orange' }}>Get More Info of the Property</p>
                                       <Button
                                             onClick={() => handleShow(property._id)}
                                             style={{
                                                float: 'right',
                                                backgroundColor: '#4e9eff',      // accent blue
                                                color: '#ffffff',                // white text
                                                border: 'none',
                                                fontWeight: '500',
                                                padding: '6px 16px',
                                                borderRadius: '6px'
                                             }}
                                             >
                                             Get Info
                                       </Button>

                                       <Modal
  show={show && propertyOpen === property._id}
  onHide={handleClose}
  contentClassName="bg-dark text-light"
>
  <Modal.Header closeButton closeVariant="white">
    <Modal.Title style={{ color: '#f5f5f5' }}>Property Info</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {property.propertyImage?.length > 0 && (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {property.propertyImage.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              src={`http://localhost:8001${image.path}`}
              alt={`Property ${idx + 1}`}
              className="d-block w-100"
              style={{
                height: '250px',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    )}

    <div>
      <div className="d-flex my-3">
        <div>
          <p className='my-1'><b>Owner Contact:</b> {property.ownerContact}</p>
          <p className='my-1'><b>Availability:</b> {property.isAvailable}</p>
          <p className='my-1'><b>Property Amount:</b> ₹{property.propertyAmt}</p>
        </div>
        <div className="mx-4">
          <p className='my-1'><b>Location:</b> {property.propertyAddress}</p>
          <p className='my-1'><b>Property Type:</b> {property.propertyType}</p>
          <p className='my-1'><b>Ad Type:</b> {property.propertyAdType}</p>
        </div>
      </div>
      <p className='my-1'><b>Additional Info:</b> {property.additionalInfo}</p>
    </div>

    <hr style={{ borderColor: '#555' }} />

    <div>
      <h4 className="text-info"><b>Your Details to Confirm Booking</b></h4>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleBooking('pending', property._id, property.ownerId);
        }}
      >
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label className='text-light'>Full Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Full Name"
                required
                name="fullName"
                value={userDetails.fullName}
                onChange={handleChange}
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#f5f5f5',
                  border: '1px solid #444'
                }}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label className='text-light'>Phone Number</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                required
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#f5f5f5',
                  border: '1px solid #444'
                }}
              />
            </InputGroup>
          </Form.Group>
        </Row>

        <Button
          type='submit'
          style={{
            backgroundColor: '#4e9eff',
            color: '#fff',
            fontWeight: 600,
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Book Property
        </Button>
      </Form>
    </div>
  </Modal.Body>
</Modal>
</> : <p>Not Available</p>
                                 }
                              </div>
                           )
                        }
                     </Card.Body>
                  </Card>
               ))
            ) : (
               <p>No Properties available at the moment.</p>
            )}
         </div>
      </>
   );
};

export default AllPropertiesCards;



