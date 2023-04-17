import React, {useState, useEffect} from 'react'
import './ProjectAll.scss'
import hero from '../../img/hero.jpg'
import axios from '../../axios/axios'
import Donation from  '../Donation/Donation';
import Item from '../Carousel/Item'
import {Container, Row, Col} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {Helmet} from "react-helmet-async";
import Footer from '../Footer/Footer';

function DonationPage() {

    const {t} = useTranslation();
    
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        const fetchData = async()=>{
            await axios.get('/cases')
            .then(res=>setData(res.data))
            .catch(err=>alert(err))
        }
       
        fetchData();
    }, [])

    const openModal=()=>setModalShow(true)

    const closeModal=()=>setModalShow(false)

    return (
        <div className="donation_discover">
            <Helmet>
                <title>{t('Project.title')}</title>
            </Helmet>

            <Donation state={modalShow} close={closeModal}/>

            <Container className="discover-heading-section">
                <Row className='discover-row'>
                    <Col lg={12}>
                        <h2 className="discover_heading">
                            {t('Donation.pageAll.heading')}
                        </h2>
                    </Col>
                    <p className="discover_heading2">
                       {t('Donation.pageAll.heading')}
                    </p>
                </Row>
            </Container>

            <div className="discover-content-section">
                <main className="donate__all__section">
                    <h1>
                        {t('Donation.pageAll.title')}
                    </h1>
                    <figure className='overall___content'>
                        <img src={hero} alt=""/>
                        <div>
                            <p> {t('Donation.pageAll.titleDes')} </p>
                            <button onClick={openModal}>
                                {t('Donation.item.button')}
                            </button>
                        </div>
                    </figure>
                </main>
                <Row className='discover-content-box'>
                    <Col lg={12} className="discover___heading4">
                        <h3>
                            {t('Donation.pageAll.heading4')}
                        </h3>
                    </Col>
                    {/* {data?.map((item)=>{
                        const percentage =getPercentage(item.reach, item.goal)
                        return(
                            <Col lg={12} md={12} sm={6} xs={12} key={item._id}>
                                <div className='Project__row'>
                                    <img src={url+item.img[0]} alt=""/>
                                    <div className='Project__info'>
                                        <h2>{item.title[i18n.language]}</h2>
                                        <p>
                                            {item.content[i18n.language]}
                                        </p>
                                        <div className='Project___donate_button'>
                                            <button onClick={()=>history.push(`/postBlog/${item._id}`)}>
                                                {t('Donation.item.view')}
                                            </button>
                                        </div>
                                        <div className='Project_percentage_teller'>
                                            <span>
                                                {t('Donation.item.start')}
                                            </span>
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
                                            <span>
                                                {t('Donation.item.goal')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })} */}
                    {data.map((item)=>{
                    return(
                        <Col lg={4} key={item._id}>
                            <Item
                                title={item.title} 
                                current={item.reach} 
                                goal={item.goal} 
                                des={item.content} 
                                img={item.img[0]} 
                                id={item._id}
                            />
                        </Col>
                    )})}
                </Row>
            </div>

            <Footer/>
        </div>
    )
}

export default DonationPage
