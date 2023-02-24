import React, {useState, useEffect} from 'react'
import './Post.scss'
import {Spinner} from 'react-bootstrap';
import SyncIcon from '@mui/icons-material/Sync';
import PaymentIcon from '@mui/icons-material/Payment';
import {useHistory, useParams} from 'react-router-dom'
import axios from '../../axios/axios';
import { useTranslation } from 'react-i18next';
import Donation from '../Donation/Donation';
import {Helmet} from 'react-helmet-async'

function Post() {

    const history = useHistory();
    const {id} = useParams();

    const {t, i18n} = useTranslation();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async()=>{
            setLoading(false);
                await axios.get(`/cases/get/${id}`)
                .then(res=>setData(res.data[0]))
                .catch(err=>history.push('/*'))

            setLoading(true);
        }
    
        fetchData();

    }, [history, id])
    
    function textIntoSentences(data) {

        let content ='';

        if(i18n.language==="zh"){

            const contentComma = data?.content.zh.replace(/，/ig, `,`)
            content = contentComma.replace(/。/ig, '.')
        }else{
            content =data?.content[i18n.language]
        }

        return content.split(/[.!?]+/).map(sentence => sentence.trim()).filter(sentence => sentence !== "").map(sentence => sentence + ".");
    }

    function DivideSentences() {
        const sentences = textIntoSentences(data)
        const images = data?.img;
        let paragraphs = [];
        let sentencesPerParagraph = Math.ceil(sentences.length / images.length);

        for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
            paragraphs.push(sentences.slice(i, i + sentencesPerParagraph));
        }
        return (
            <section className='post_content'>
            {paragraphs.map((paragraph, index) => (
                <div key={index}>
                {paragraph.map(sentence => (
                    <p key={sentence}>{sentence}</p>
                ))}
                {index < paragraphs.length - 1 && <img src={images[index+1]} alt={`img${index}`} style={{marginBottom:"3vmin"}}/>}
                </div>
            ))}
            </section>
        );
    }

    const percentage = Math.ceil((data?.reach * 100 / data?.goal))
    
    return (
        <div className="post">
        <Helmet>
          <title>Project Post</title>
        </Helmet>
        {loading ? 
            <>            
            <div className="post_container">
                <Donation state={modalShow} close={handleClose}/>
                <div className="post_blog_box">
                    <div className="post_content_info">

                        {/* blog title and main image */}
                        <img src={data?.img[0]} className="mainImg" alt="main"/>
                        <h1 className="post_title">
                            {data?.title[i18n.language]}
                        </h1>

                        {/* blog info for tablet and phone view */}
                        <div className="donation_view">
                            <button onClick={handleShow}>
                                <PaymentIcon className='btnicon'/>
                                {t('Donation.pageAll.button1')}
                            </button>
                        </div>
                        
                        <div className='project___percentage tablet-show'>
                            <div className='percentage_box'/>
                            <div className='percentage_progress' style={{width:`${percentage}%`}}/>
                            <div className='percentage_teller' style={{
                                left:`${percentage}%`, 
                                transform:`translate(-${percentage}%, -50%)`
                            }}>
                                {percentage} %
                            </div>
                        </div>

                        {/* blog created Date */}
                        <div className="post_date">
                            <span>
                                {t('Donation.post.BBD', {date:'5'})}
                            </span>
                            <div onClick={()=>history.push('/discover')}>
                                <SyncIcon/>
                                {t('Donation.post.view2')}
                             </div>
                        </div>

                        {/* blog content */}
                        <DivideSentences/>

                        <button onClick={handleShow}>
                            {t('Donation.item.button')}
                        </button>       
                    </div>

                    {/* blog info for pc and laptop */}
                    <div className="post_donation">
                        <div className='post_donation_info'>
                            <button onClick={handleShow}>
                                <PaymentIcon className='btnicon'/>
                                {t('Donation.pageAll.button1')}
                            </button>
                            <div className='project___percentage'>
                                <div className='percentage_box'/>
                                <div className='percentage_progress' style={{width:`${percentage}%`}}/>
                                <div className='percentage_teller' style={{
                                    left:`${percentage}%`, 
                                    transform:`translate(-${percentage}%, -50%)`
                                }}>
                                    {percentage} %
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            </>
            : 
            <div className='post_spinner'>
                <Spinner variant='dark' animation='border'/>
            </div>
        }
           
            
        </div>
    )
}

export default Post
