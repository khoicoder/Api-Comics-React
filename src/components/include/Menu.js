import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
const Menu = () => {
    const [getData, setData] = useState([]);
    const items = getData?.data?.items;
    


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://otruyenapi.com/v1/api/the-loai  ');
        setData(response.data);
       
        console.log(response);
      } catch (err) {
        
        
      }
    };

    fetchData();
  }, []);
  return (
    
    <div>
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React Comics App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as ={Link} to ="/">Home</Nav.Link>
            <Nav.Link as = {Link} to= "/.trending/dang-phat-hanh">Đang Phát Hành </Nav.Link>
            <Nav.Link as = {Link} to= "/.trending/hoan-thanh">Hoàn Thành </Nav.Link>
            <Nav.Link as = {Link} to= "/.trending/sap-ra-mat">Sắp Ra Mắt </Nav.Link>

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              {items && items.length > 0 ? (
       items.map((nav, index) =>
          (<NavDropdown.Item as={Link} to={`/genre/${nav.slug}`}>{nav.name}</NavDropdown.Item>)
      )):
        (<NavDropdown.Item as= {Link} to= "/"> Newest 
              </NavDropdown.Item>
              )}

              
              
        
            </NavDropdown>  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    </div>
  )
}

export default Menu
