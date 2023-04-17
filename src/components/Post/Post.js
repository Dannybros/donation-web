import React, {useState, useEffect} from 'react'
import './Post.scss'
import axios from '../../axios/axios';
import Donation from '../Donation/Donation';
import SyncIcon from '@mui/icons-material/Sync';
import PaymentIcon from '@mui/icons-material/Payment';
import {Spinner} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {Helmet} from 'react-helmet-async'
import Footer from '../Footer/Footer';

function Post() {

    const navigate = useNavigate();
    const {id} = useParams();

    const {t, i18n} = useTranslation();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async()=>{
            setLoading(true);
                await axios.get(`/cases/get/${id}`)
                .then(res=>setData(res.data[0]))
                .catch(err=>navigate('/404'))

            setLoading(false);
        }
    
        fetchData();

    }, [navigate, id])
    

    function textIntoSentences(content) {
        return content.split(/[.!?]+/).map(sentence => sentence.trim()).filter(sentence => sentence !== "").map(sentence => sentence + ".");
    }
      

    function DivideSentences() {
        const sentences = textIntoSentences(data.content.en);
        const numImages = data.img.length;
        let sentencesPerParagraph = Math.ceil(sentences.length / (numImages + 1));
        
        let paragraphs = [];
        for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
            paragraphs.push(sentences.slice(i, i + sentencesPerParagraph));
        }

        return (
            <section className='post_content'>
            {paragraphs.map((paragraph, index) => (
                <main key={index}>
                    <p>
                    {paragraph.map(sentence => (
                        <span key={sentence}>{sentence}</span>
                    ))}
                    </p>
                    {index < numImages-1 && <img className='mb-3' src={data.img[index+1]} alt={`img${index+1}`}/>}
                </main>
            ))}
            </section>
        );
    }

    if(loading){
        return(
            <div className='post_spinner'>
                <Spinner variant='dark' animation='border'/>
            </div>
        )
    }
    
    return (
        <>
        <Helmet>
        <title>Project Post</title>
        </Helmet>        
        <section className="post_container">
            <Donation state={modalShow} close={handleClose}/>
            <main className="post_content_info">
                {/* blog title and main image */}
                <img src={data?.img[0]} className="mainImg" alt="main"/>
                <h1 className="post_title mb-3">
                    {data?.title[i18n.language]}
                </h1>

                {/* blog info for tablet and phone view */}
                <div className="donation_view">
                    <button onClick={handleShow}>
                        <PaymentIcon className='btnicon'/>
                        {t('Donation.pageAll.button1')}
                    </button>
                </div>

                <div className="post_date">
                    <span>
                        {t('Donation.post.BBD', {date:data.createdAt.split("T")[0]})}
                    </span>
                    <div onClick={()=>navigate('/discover')}>
                        <SyncIcon/>
                        {t('Donation.post.view2')}
                        </div>
                </div>

                <DivideSentences/>
                
                <button onClick={handleShow}>
                    {t('Donation.item.button')}
                </button>       
            </main>

            <main className="post_donation">
                <figure className='post_donation_info'>
                    <button onClick={handleShow}>
                        <PaymentIcon className='btnicon'/>
                        {t('Donation.pageAll.button1')}
                    </button>
                </figure>
            </main>
        </section>
        <Footer/>
        </>
    )
}

export default Post
