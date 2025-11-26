import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col,Container,ListGroupItem,Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // thằng helmet này phải import riêng  
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Menu from './include/Menu';
const DetailPage = () => {
  const {slug} = useParams();
  const [getData, setData] = useState([]);
  const [getDataChapter, setDataChapter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const item = getData?.data?.item || [];

    
    const [isModalOpen,setModalOpen] = useState(false);

    const handleClose =() => setModalOpen(false);
    const handleReadChapter = async(chapter_api) => {
      try {
        const response = await axios.get(`${chapter_api}`);
        setDataChapter(response.data);
        setLoading(false);
        // console.log(response);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
      setModalOpen(true);

    }
    

    
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
        <Menu> </Menu>
        <Button as={Link} to="/"> back to HomePage </Button>
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
              
                    <Card.Text>{item.author && item.author.length > 0 ? (
                                  item.author.map((author, index) => (
                    <Badge bg='info' key={index}>{author.name}</Badge>
                                
                                ) )): (
                              "Other")} </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col> 
              <Card> 
                  <ListGroup className="scrollerable-List">
        {item.chapters && item.chapters.length > 0 ? (
        item.chapters.map((chapter, index) =>( 
          <div key={index}>
            <h5>{chapter.server_name}</h5>
            <ListGroupItem> 
              {chapter.server_data && chapter.server_data.length > 0 ? (
        chapter.server_data.map((listchapter,subindex) =>(
          <div className='chapter_click' 
          key ={subindex} 
          onClick={()=> handleReadChapter(listchapter.chapter_api_data)}>

          chapter :{listchapter.chapter_name} </div>


        ))) :(<span> Chapter comming Soon </span>)}

            </ListGroupItem>
            </div>
        
          
        ))) : (<span> Chapter is Coming Soon</span>)}

                  
                
                  </ListGroup>

                </Card>
              </Col>
        
        </Row>{
          isModalOpen && ( 
            <Modal show={isModalOpen} onHide={handleClose}>
              <Modal.Header closeButton>
                {getDataChapter?.data?.item && (
                  <Modal.Title>Chapter 
                  {getDataChapter.data.item.chapter_name} 
                - {getDataChapter.data.item.comic_name} 
                </Modal.Title>
                )}  
            </Modal.Header>
              <Modal.Body> 
                {getDataChapter.data.item.chapter_image && 
                getDataChapter.data.item.chapter_image.length >0 
                ? 
                (getDataChapter.data.item.chapter_image.map((chapterImage,index)=> (
                <Card.Img
                key = {index}
                style ={{margin:0}}
                variant='top'
                src ={`${getDataChapter.data.domain_cdn}/${getDataChapter.data.item.chapter_path}/${chapterImage.image_file}`}>
                  
                </Card.Img>


              ))):(<span>No image loading</span>)}
</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}> Close
            </Button>
        </Modal.Footer>
          </Modal>
          )
        
          
        }
        
      </Container>
    </>
  )
}

export default DetailPage

