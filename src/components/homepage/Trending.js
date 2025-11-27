import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import Menu from '../include/Menu'

const Trending = () => {
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const items = getData?.data?.items || [];
    const {slug} = useParams(); 
    useEffect(() => {

    const fetchData = async () => {
        try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/danh-sach/${slug}`);
        setData(response.data);
        setLoading(false);
        console.log(response);
        } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <>
      <Helmet>
        <title>{getData?.data?.seoOnPage?.titleHead}</title>
      </Helmet>
      
      <Container >
        <Menu></Menu>
        
        
        <Row>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <Col key={index}>
                <Card>
                  <Card.Img variant="top" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
                  <Card.Body>
                    <Card.Text>{item.name || "No tittle"}</Card.Text>
                    <Card.Title>{item.updatedAt}</Card.Title>
                    <Card.Text>
                        {item.category && item.category.length > 0 ? (
                //https://otruyen.cc/
                //https://docs.otruyenapi.com/#/home/get_home
              item.category.map((category, index) => (

              <Badge bg='info' key={index}>{category.name}</Badge>
            
              

            ) )): (
          "Other")} </Card.Text>
                
        
                    <Button variant="primary btn-sm" as={Link} to= {`/comics/${item.slug}`}> More Detail</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Card>
                <Card.Body>No content available</Card.Body>
              </Card>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Title>{getData?.data?.seoOnPage?.titleHead}</Card.Title>
              <Card.Body>{getData?.data?.seoOnPage?.descriptionHead}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Trending;