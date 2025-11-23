import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Card, Col,Container,Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // thằng helmet này phải import riêng  
const DetailPage = () => {
  const {slug} = useParams();
  const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const item = getData?.data?.item || [];
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://otruyenapi.com/v1/api/truyen-tranh/${slug}`);
        setData(response.data);
        setLoading(false);
        // console.log(response);
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
        <title>{getData?.data?.seoOnPage.titleHead}</title>
      </Helmet>

      <Container> 
        <Row> 
          <Col>
            <Card>
              <Card.Title>{getData?.data?.seoOnPage?.titleHead}</Card.Title>
              <Card.Body>{getData?.data?.seoOnPage?.descriptionHead}</Card.Body>
            </Card>
          </Col>
          <Row> 

          </Row>

            <Col>
                <Card>
                  <Card.Img style={{width:"20rem" }} variant="top" src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`} />
                  <Card.Body>
                    <Card.Text>{item.name || "No tittle"}</Card.Text>
                    <Card.Text  dangerouslySetInnerHTML = {{__html: item.content}} ></Card.Text>
                    <Card.Title>{item.updatedAt}</Card.Title>

                    <Card.Text>
                        {item.category && item.category.length > 0 ?
                         (item.category.map((category, index) => (
                    <Badge bg='info' key={index}>
                      {category.name} </Badge> ) )
                    ): 
                    ("Other")} 
                    </Card.Text>
                    <Card.Text>{item.author || "No tittle"}</Card.Text>
                    <Card.Title>{item.updatedAt}</Card.Title>
                    <Card.Text>{item.author && item.author.length > 0 ? (
                                  item.author.map((author, index) => (
                    <Badge bg='info' key={index}>{author.name}</Badge>
                                
                                ) )): (
                              "Other")} </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
          
        </Row>
      </Container>
    </>
  )
}

export default DetailPage

