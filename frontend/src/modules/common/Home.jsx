import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import p1 from '../../images/p1.jpg'
import p2 from '../../images/p2.jpg'
import p3 from '../../images/p3.jpg'
import p4 from '../../images/p4.jpg'
import AllPropertiesCards from '../user/AllPropertiesCards';

const Home = () => {
   const [index, setIndex] = useState(0);

   const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
   };
   const navLinkStyle = {
  color: '#4e9eff',
  textDecoration: 'none',
  fontWeight: 500,
  marginRight: '15px'
};

 
   return (
      <>
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


         <div className='home-body'>
            <Carousel activeIndex={index} onSelect={handleSelect}>
               <Carousel.Item>
                  <img
                     src={p1}
                     alt="First slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p2}
                     alt="Second slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p3}
                     alt="Third slide"
                  />
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     src={p4}
                     alt="Fourth slide"
                  />
               </Carousel.Item>
            </Carousel>
         </div>


         <div className='property-content'>
            <div className='text-center'>
               <h1 className='m-1 p-5'>All Properties that may you look for</h1>
               <p style={{fontSize: 15, fontWeight: 800}}>Want to post your Property? <Link to={'/register'}><Button variant='outline-info'>Register as Owner</Button></Link></p>
            </div>

            <Container>
               <AllPropertiesCards />
            </Container>
         </div>
      </>
   )
}

export default Home
