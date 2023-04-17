import React from 'react'
import {Carousel} from 'react-bootstrap'
import img1 from '../../../img/hero.jpg'
import img2 from '../../../img/hero2.jpg'
import img3 from '../../../img/hero3.jpg'
import './Hero.scss'
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function HeroBoot() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (

        <Carousel>
            <Carousel.Item>
                <div
                    className="hero_container"
                    style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${img2})`}}
                />
                <Carousel.Caption className='hero_msg'>
                    <h1 className='mb-5'>
                        {t('Home.Hero.heading1')}
                    </h1>
                    <button className='hero__button my-5' onClick={()=>navigate('/project')}>
                        <span className="green"> 
                            {t('Home.Hero.button')}
                        </span>
                    </button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div
                    className="hero_container"
                    style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${img1})`}}
                />
                <Carousel.Caption className='hero_msg'>
                    <h1 className='mb-5'>
                        {t('Home.Hero.heading2')}
                    </h1>
                    <button className='hero__button my-5' onClick={()=>navigate('/project')}>
                        <span className="green"> 
                            {t('Home.Hero.button')}
                        </span>
                    </button>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div
                    className="hero_container"
                    style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${img3})`}}
                />
                <Carousel.Caption className='hero_msg'>
                    <h1 className='mb-5'>
                        {t('Home.Hero.heading3')}
                    </h1>
                    <button className='hero__button my-5' onClick={()=>navigate('/project')}>
                        <span className="green"> 
                            {t('Home.Hero.button')}
                        </span>
                    </button>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default HeroBoot
