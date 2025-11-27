import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, PageItem, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Menu from '../include/Menu';
import Pagination from 'react-bootstrap/Pagination';
const Home = () => {
  const itemsPerPage = 24;
  const [getData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const items = getData?.data?.items || []; 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${currentPage}`);
        setData(response.data);
        setLoading(false);
        console.log(response);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const totalItems =getData?.data?.params?.pagination?.totalItems || 0;
  const totalPage = Math.ceil(totalItems/itemsPerPage); // chia làm tròn

  return (
    <>
      <Helmet>
        <title>{getData?.data?.seoOnPage?.titleHead}</title>
      </Helmet>
      
      <Container >
        <Menu> </Menu>
    <Pagination className="pagination-container" >

      <Pagination.Prev
        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        disabled={currentPage === 1}
        
      />
      {[...Array(totalPage)].map((_, index)=>{
        const pageNumber = index+1;
        const rangeStart = Math.floor((currentPage-1)/5)*5+1;
        const rangeEnd = Math.min(rangeStart+4,totalPage);
        if(pageNumber>=rangeStart && pageNumber<=rangeEnd){
          return(
            <Pagination.Item key ={pageNumber}
            active={pageNumber===currentPage}
            onClick={()=> paginate(pageNumber)}>{pageNumber}
            </Pagination.Item>
          );
          return null;
        }
      })}

      <Pagination.Next
          onClick={() => currentPage < totalPage && paginate(currentPage + 1)}
          disabled={currentPage === totalPage}
      />

    </Pagination>
        <Row>
          <Col>
            <Card>
              <Card.Title>{getData?.data?.seoOnPage?.titleHead}</Card.Title>
              <Card.Body>{getData?.data?.seoOnPage?.descriptionHead}</Card.Body>
            </Card>
          </Col>
        </Row>
        
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
       
        
      </Container>
    </>
  );
};

export default Home;