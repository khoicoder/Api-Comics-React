import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Menu = () => {
    const navigate = useNavigate();
    const [getData, setData] = useState([]);
    const items = getData?.data?.items;
    


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://otruyenapi.com/v1/api/the-loai');
        setData(response.data);
       
        console.log(response);
      } catch (err) {
        
        
      }
    };

    fetchData();
  }, []);
  const handleSearch= (event) =>
  {
    event.preventDefault(); //preventDefauth chống lại mặt định trang
    const formData = new FormData(event.currentTarget);
    const querry = formData.get("keyword");
    navigate(`/search?querry= ${querry}`);
  }
  return (
    
    <div>
         <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React Comics App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as ={Link} to ="/">Home</Nav.Link>
            <Nav.Link as = {Link} to= "/trending/dang-phat-hanh">Đang Phát Hành </Nav.Link>
            <Nav.Link as = {Link} to= "/trending/hoan-thanh">Hoàn Thành </Nav.Link>
            <Nav.Link as = {Link} to= "/trending/sap-ra-mat">Sắp Ra Mắt </Nav.Link>

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
      <Form inline autoComplete='off' method='get'onSubmit={handleSearch}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              name = "keyword"
              placeholder="tìm tên truyện"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Search</Button>
          </Col>
        </Row>
      </Form>
        
    </Navbar>
      
    </div>
  )
}

export default Menu
