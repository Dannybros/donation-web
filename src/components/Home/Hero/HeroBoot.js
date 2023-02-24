import React from 'react'
import {Carousel} from 'react-bootstrap'
import img1 from '../../../img/hero.jpg'
import img2 from '../../../img/hero2.jpg'
import './Hero.scss'
import {useHistory} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function HeroBoot() {
    const history = useHistory();
    const {t} = useTranslation();

    return (
        <Carousel>
            {/* First Slide */}
            <Carousel.Item 
                interval={5000} 
                className='Hero__container' 
                style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${img1})`}}
            >
                <Carousel.Caption className="hero__msg">
                    <h1 style={{marginBottom: "10px !important"}}>
                        {t('Home.Hero.heading1')}
                    </h1>
                    <button onClick={()=>history.push('/discover')}>
                        <span className="green"> 
                            {t('Home.Hero.button')}
                        </span>
                    </button>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Second Slide */}
            <Carousel.Item 
                interval={5000} 
                className='Hero__container'
                style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(${img2})`}}
            >
                <Carousel.Caption className='hero__msg'>
                    <h1 style={{marginBottom: "10px !important"}}>
                        {t('Home.Hero.heading2')}
                    </h1>
                    <button onClick={()=>history.push('/discover')}>
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
