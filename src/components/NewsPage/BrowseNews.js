import React, {useState, useEffect} from 'react'
import {Row, Col, ListGroup, Spinner, Container} from 'react-bootstrap';
import './News.css'
import axios from '../../axios/axios'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ChevronRight } from '@mui/icons-material';
import Footer from '../Footer/Footer';

function BrowseNews() {
    
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const [data, setData]  = useState([]);
  
  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await axios.get('/news')
        const sortedData = res.data.sort((a, b) => a.view - b.view);
        setData(sortedData);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [])

  const handleNewsClick=(param)=>{
    navigate(`/news/${param}`);
  }

  function NewsList(){
    return(
    <div className='news_list'>
      {data.map((item, index) => (
        <figure key={index} className="mb-3">
          {item.img.length!==0 &&
          
          <img
            src={item.img[0]}
            alt="blog post"
            onClick={()=>handleNewsClick(item._id)}
          />
          }
          <main className='news_card_info p-3'>
            <span className='news_card_span'>{item.date.split('T')[0]}</span>
            <figcaption className='news_card_title' onClick={()=>handleNewsClick(item._id)}>
              {item.title[i18n.language]}
            </figcaption>
          </main>
        </figure>
        ))}      
        {data.map((item, index) => (
        <figure key={index} className="mb-3">
          <img
            src={item.img[0]}
            alt="blog post"
            onClick={()=>handleNewsClick(index)}
          />
          <main className='news_card_info p-3'>
            <span className='news_card_span'>{item.date.split('T')[0]}</span>
            <figcaption className='news_card_title' onClick={()=>handleNewsClick(item._id)}>
              {item.title.en}
            </figcaption>
          </main>
        </figure>
        ))}      
    </div>
    )
  }

  function TopNews(){
    const sortedData = data.sort((a, b) => b.view - a.view).slice(0,5);

    return(
      <div className='news_highlight mt-2'>
        <h1 onClick={()=>handleNewsClick("list/top")}>
            {t('News.topNews')}
        </h1>
        <ListGroup variant="flush">
          {sortedData.map((news)=>(
            <ListGroup.Item 
              as="a" 
              key={news._id} 
              style={{textAlign:"justify", fontSize:"14px"}} 
              onClick={()=>handleNewsClick(news._id)}
            > 
              {news.title[i18n.language]}
              <span className='text-muted ms-3'>{news.date.split('T')[0]}</span>
            </ListGroup.Item>
          ))}
      </ListGroup>
      </div>
    )
  }

  if (data.length===0) {
    return (
      <div className='news_list_loading'>
          <Spinner animation="border" role="status" className="loading-spinner"/>
      </div>
    );
  }

 
  return (
    <>
    <Container className="py-5"> 
      <Row className="justify-content-between" style={{ display: 'flex' }}>
          <Col xs={12} md={8} lg={9}>
              <h2 className='mb-4' style={{display:"flex", alignItems:"flex-end", cursor:"pointer"}} onClick={()=>handleNewsClick("list/recent")}>
                  {t('News.heading')}
                  <ChevronRight className='news_list_icon'/>
              </h2> 
              <NewsList/>
          </Col>
          <Col xs={12} md={4} lg={3}>
              <div className="sidebar" style={{ position: 'sticky', top: '100px' }}>
              <TopNews/>
              </div>
          </Col>
      </Row>
    </Container>
    <Footer/>
    </>

  )
}

export default BrowseNews