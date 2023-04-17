import React, {useEffect, useState} from 'react'   
import './News.css'
import {Container} from 'react-bootstrap';
import {useParams, useNavigate} from 'react-router-dom';
import axios from '../../axios/axios'
import { useTranslation } from 'react-i18next';
import {Helmet} from 'react-helmet-async'

function NewsDetail() {

    const navigate = useNavigate();
    const {i18n} = useTranslation();
    const {id} = useParams();
    const [data, setData]  = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          await axios.get(`/news/getOne/${id}`)
          .then(res=>setData(res.data[0]))
          .catch(err=>{
            err.response.status===404 ? navigate("/404") : navigate(-1)
          });
        };
    
        fetchData();
    }, [id, navigate])
        
    useEffect(() => {
        window.scrollTo(0, 0);

        axios.post('/news/view', {id:id})
        .then(console.log('saved'))
        .catch(err=>console.log(err))
    }, [id])
   
    function textIntoSentences(data) {
        return data.split(/[.!?。]+/).map(sentence => sentence.trim()).filter(sentence => sentence !== "").map(sentence => sentence + ".");
    }
      
    function DivideSentences() {
        const sentences = textIntoSentences(data.content[i18n.language]);
        const numImages = data.img.length;
        let sentencesPerParagraph = Math.ceil(sentences.length / (numImages + 1));
        
        let paragraphs = [];
        for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
            paragraphs.push(sentences.slice(i, i + sentencesPerParagraph));
        }
    
        return (
          <section className='mt-3'>
          {paragraphs.map((paragraph, index) => (
            <main key={index} className="news_details">
              <p>
              {paragraph.map(sentence => (
                <span key={sentence}>{sentence} </span>
              ))}
              </p>
              {index < numImages && <img src={data.img[index]} alt={`img${index}`}/>}
            </main>
          ))}
          </section>
        );
      }

    if (data.length<=0) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="py-5">
            <Helmet> <title>News Blog </title> </Helmet>
            <h2 className='mb-3 text-bold'>{data.title[i18n.language]}</h2>
            <span className='news_card_span mx-2'>{data.date.split("T")[0]}</span>
            <DivideSentences/>
        </Container>
    )
}

export default NewsDetail
