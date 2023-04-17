import React from 'react'
import './About.scss'
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function About() {

    const navigate = useNavigate();
    const {t} =useTranslation(); 

    
    const handleButtonAboutUs=()=>{
        localStorage.setItem('about', `${t('About_Us.tab3.title')}`)
        navigate('/about-us')
    }

  return (
    <section className="about-section">
        <div className="About-msg-box">
            <div className="about-title">
                <span>{t('About_Us.heading')}</span>
                <button onClick={handleButtonAboutUs}>{t('About_Us.tab3.title')}</button>
            </div>
            <div className='about__context'>
                {t('About_Us.tab1.para')}
            </div>
        </div>
    </section>
  )
}

export default About